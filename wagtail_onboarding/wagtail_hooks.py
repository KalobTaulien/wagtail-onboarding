from django.urls import path
from django.utils.safestring import mark_safe

try:
    # Django 2
    from django.contrib.staticfiles.templatetags.staticfiles import static
except ModuleNotFoundError:
    # Django 3
    from django.templatetags.static import static

from django.urls import reverse
from django.utils.html import format_html
from wagtail.core import hooks

from wagtail_onboarding.views import admin_tracking_view


@hooks.register("insert_global_admin_js", order=101)
def global_admin_js():
    onboarding_tracking_url = reverse("track_onboarding")
    admin_url = reverse("wagtailadmin_home")

    # Adds a couple of global urls used in JavaScript.
    onboarding_variable = format_html(
        f"""
            <script>
                window.onboardingTackingUrl = "{onboarding_tracking_url}";
                window.adminUrl = "{admin_url}";
            </script>
        """
    )
    return onboarding_variable + format_html(
        # Needed for React to render the tour into.
        '<div id="wagtail-onboarding"></div>'
        # Adds wagtail-onboarding.js to the /admin/
        '<script src="{}"></script>',
        static("wagtail_onboarding/js/wagtail-onboarding.js"),
    )


# Creates a new onboarding panel.
class OnboardingPanel:
    order = 0

    def __init__(self, request):
        self.progress = request.user.onboarding.progress

    def render(self):
        # TODO: Move the inline CSS into a CSS file and register it with the admin.
        return mark_safe(
            f"""
        <section class="panel summary nice-padding">
            <div style='border: 2px solid #ccc; padding: 20px; box-shadow: 0 5px 2px rgba(0, 0, 0, 0.35);' id="onboarding-status">
                <h2>Your onboarding status</h2>
                <p>Complete more admin tours to full this bar up.
                <progress class="js-onboarding-progress" max="100" value="{self.progress}" style='width: 100%; height: 30px;'>{self.progress}%</progress>
            </div>
        </section>
        """
        )


@hooks.register("construct_homepage_panels")
def onboarding_panel(request, panels):
    panels.append(OnboardingPanel(request))


@hooks.register("register_admin_urls")
def urlconf_time():
    return [
        path("track-onboarding/", admin_tracking_view, name="track_onboarding"),
    ]
