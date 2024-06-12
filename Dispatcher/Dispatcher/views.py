import os
import json
import threading
import datetime
from . import key
from . import settings
from django.core import mail
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def sendAlert(request):
    if request.method == "POST":
        try:
            response = json.loads(request.body)
        except Exception:
            return HttpResponse(status = 404, content = "Invalid Input")

        username = response.get("username")
        task = response.get("task")
        email = response.get("email")

        if "" in (username, task, email): return HttpResponse(status = 404)

        mail.send_mail(
            'Deadline - Task Reminder',
            f"Dear {username}, \nYour task {task} has been added successfully to our databases.\n\n Thank You\n Team Task Manager",
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )
        with open(f"secrets/{username}_{email}.py", "w") as file:
            TEMPLATE = key.TEMPLATE.replace('_subject_', f"Task Due - {datetime.date.today()}")
            TEMPLATE = TEMPLATE.replace("_receiverAddress_", email)
            TEMPLATE = TEMPLATE.replace("_fileName_", f"secrets/{username}_{email}.py")
            file.write(TEMPLATE)

        def execute():os.system(f"py secrets/{username}_{email}.py")
        thread = threading.Thread(target = execute)
        thread.start()
        thread.join()
        

        return HttpResponse(status = 200)
        