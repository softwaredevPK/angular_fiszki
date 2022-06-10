from .views import SetViewSet, FlashcardViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('sets', SetViewSet)
router.register('flashcards', FlashcardViewSet)
urlpatterns = router.urls
