from rest_framework.serializers import ModelSerializer, ListSerializer, PrimaryKeyRelatedField
from .models import Set, Flashcard


class SetRelatedField(PrimaryKeyRelatedField):

    def get_queryset(self):
        return Set.objects.filter(owner=self.context['request'].user)


class FilteredListSerializer(ListSerializer):

    def to_representation(self, data):
        request = self.context['request']
        passed = request.query_params.get('passed', False)
        if passed:
            passed = True if passed == 'true' else False
            data = data.filter(passed=passed)
        repeat_needed = request.query_params.get('repeat_needed', False)
        if repeat_needed:
            repeat_needed = True if repeat_needed == 'true' else False
            data = data.filter(repeat_needed=repeat_needed)
        return super(FilteredListSerializer, self).to_representation(data)


class FlashCardSerializer(ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['front', 'back', 'id']


class FlashCardForSetSerializer(ModelSerializer):
    class Meta:
        model = Flashcard
        list_serializer_class = FilteredListSerializer
        fields = ['front', 'back', 'id', "repeat_needed", "passed"]


class FlashCardDetailedSerializer(ModelSerializer):

    set = SetRelatedField()

    class Meta:
        model = Flashcard
        fields = ['id', 'front', 'back', "set", "repeat_needed", "passed"]
        read_only_fields = ['id']


class FlashCardUpdateSerializer(ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['front', 'back', 'id', "repeat_needed", "passed"]
        read_only_fields = ['id']


class SetSerializer(ModelSerializer):

    class Meta:
        model = Set
        fields = ['name', 'id']
        read_only_fields = ["id", "owner"]


class SetDetailedSerializer(ModelSerializer):

    flashcards = FlashCardForSetSerializer(many=True, read_only=True)

    class Meta:
        model = Set
        fields = ['name', 'id', 'flashcards']
        read_only_fields = ["id", "flashcards", "owner"]

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return self.Meta.model.objects.create(**validated_data)
