from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
# Create your models here.


class TimeStamp(models.Model):
    created = models.DateTimeField(_('created'), auto_now=False, auto_now_add=True)
    last_modified = models.DateTimeField(_('last modified'),  auto_now=True)

    class Meta:
        abstract = True


class Set(TimeStamp):
    name = models.CharField(max_length=128)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sets')


class Flashcard(TimeStamp):
    front = models.TextField(_('front'))
    back = models.TextField(_('back'))
    set = models.ForeignKey(Set, on_delete=models.CASCADE, related_name='flashcards')
    repeat_needed = models.BooleanField(_("repeat_needed"), default=False)
    passed = models.BooleanField(_('passed'), default=False)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.id:
            original = Flashcard.objects.get(id=self.id)
            if self.passed and not original.passed:  # now passed, but wasn't
                self.repeat_needed = False
            if self.repeat_needed and not original.repeat_needed:  # now repeat_needed, but wasn't
                self.passed = False
        super().save(force_insert=False, force_update=False, using=None, update_fields=None)
