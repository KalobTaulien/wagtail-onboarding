import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods


@login_required
@require_http_methods(["PUT"])
@csrf_exempt
def admin_tracking_view(request):
    data = json.loads(request.body.decode("utf-8"))

    if data["tour"] == "admin_tour":
        request.user.onboarding.completed_admin_tour = True
        request.user.onboarding.update_progress()
        request.user.onboarding.save()
    elif data["tour"] == "page_edit_tour":
        request.user.onboarding.completed_page_edit_tour = True
        request.user.onboarding.update_progress()
        request.user.onboarding.save()
    # TODO: Add more tours.
    # elif data['tour'] == "new_tour":
    #     pass

    return JsonResponse({
        "progress": request.user.onboarding.progress
    }, status=200)
