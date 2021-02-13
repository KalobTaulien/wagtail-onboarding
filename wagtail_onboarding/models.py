from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Onboarding(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )
    progress = models.PositiveSmallIntegerField(
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100),
        ],
    )
    completed_admin_tour = models.BooleanField(default=False)
    completed_page_edit_tour = models.BooleanField(default=False)

    @property
    def percent_complete(self) -> int:
        progress = 0
        fields = [
            "completed_admin_tour",
            "completed_page_edit_tour",
        ]
        total_fields = len(fields)
        for field in fields:
            if getattr(self, field, False):
                progress = progress + round(100 / total_fields)

        # Theoretically `progress` could be over 100 due to rounding.
        # Ensure it's always 100 or less.
        if progress > 100:
            progres = 100

        return progress

    def update_progress(self):
        self.progress = self.percent_complete
        self.save()

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = "Onboarding status"
        verbose_name_plural = "Onboarding status"
