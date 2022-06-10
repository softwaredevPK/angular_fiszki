from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.openapi import Parameter, IN_QUERY, TYPE_BOOLEAN
from rest_framework import mixins, viewsets
from .serializers import SetSerializer, FlashCardUpdateSerializer, SetDetailedSerializer, FlashCardDetailedSerializer
from .models import Set, Flashcard
from rest_framework.decorators import action
from rest_framework.response import Response


passed_param = Parameter('passed', in_=IN_QUERY, type=TYPE_BOOLEAN, )
repeat_needed_param = Parameter('repeat_needed', in_=IN_QUERY, type=TYPE_BOOLEAN, )


class SetViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = Set.objects.all()
    serializer_class = SetDetailedSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]

    def get_serializer(self, *args, **kwargs):
        if self.action == 'list':
            kwargs.setdefault('context', self.get_serializer_context())
            return SetSerializer(*args, **kwargs)
        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    @swagger_auto_schema(manual_parameters=[repeat_needed_param, passed_param])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class FlashcardViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = Flashcard.objects.all()
    serializer_class = FlashCardDetailedSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]

    def get_queryset(self):
        qs = self.queryset.filter(set__owner=self.request.user)
        if self.action in ['list', 'random']:
            passed = self.request.query_params.get('passed', False)
            if passed:
                passed = True if passed == 'true' else False
                qs = qs.filter(passed=passed)
            repeat_needed = self.request.query_params.get('repeat_needed', False)
            if repeat_needed:
                repeat_needed = True if repeat_needed == 'true' else False
                qs = qs.filter(repeat_needed=repeat_needed)
        return qs

    def get_serializer(self, *args, **kwargs):
        if self.action in ['partial_update', 'update']:
            kwargs.setdefault('context', self.get_serializer_context())
            return FlashCardUpdateSerializer(*args, **kwargs)
        return super().get_serializer(*args, **kwargs)

    @swagger_auto_schema(manual_parameters=[repeat_needed_param, passed_param])
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(manual_parameters=[repeat_needed_param, passed_param])
    @action(detail=False, methods=['get'])
    def random(self, request):
        instance = self.get_queryset().order_by('?').first()
        serializer = FlashCardDetailedSerializer(instance)
        return Response(data=serializer.data, status=200)

    @action(detail=False, methods=['get'])
    def to_repeat(self, request):
        qs = self.get_queryset().filter(repeat_needed=True)
        serializer = FlashCardDetailedSerializer(qs, many=True)
        return Response(data=serializer.data, status=200)
