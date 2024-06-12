SENDER = 'weatherupdate.adityapathak@gmail.com'
PASSWORD = 'laxt lrmv jpxs fsng'


DUETEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Task Due Reminder</title>
<link rel="stylesheet" href="style.css"> </head>
<body>
  <div id="task-reminder">
    <p>Hey __username__!  Just a friendly reminder that you still have a task due.</p>
    <p>Don't let it slip your mind! Take a moment to review your task list and ensure its timely completion. Completing tasks on schedule helps you stay organized and achieve your goals. </p>
    <p>Click <a href="#">here</a> to access your task list.</p>
  </div>
</body>
<style>
#task-reminder {
  background-color: #ffe0e0; /* Light red for a reminder */
  border: 1px solid #f08080; /* Red border */
  padding: 15px;
  border-radius: 5px;
  margin: 10px auto;
  width: 50%; /* Adjust width as needed */
  text-align: center;
}

#task-reminder p {
  font-size: 16px;
  margin-bottom: 5px;
}

</style>
</html>
"""

TEMPLATE = f"""
import os
import time
import smtplib
import schedule
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class Mail:
    def __init__(self):
        self.sender = "{SENDER}"
        self.password = "{PASSWORD}"

    def sendMail(self, subject: str, receiverAddress: str, mail: str):
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        message = MIMEMultipart()
        message['From'] = 'Aditya Pathak'
        message['To'] = receiverAddress
        message['Subject'] = subject
        message.attach(MIMEText(mail, 'html'))
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.ehlo()
            server.starttls()
            server.login(self.sender, self.password)
            server.send_message(message)

def send_mail():
    Mail().sendMail("_subject_", "_receiverAddress_", '''{DUETEMPLATE.replace("__username__", "there")}''')

schedule.every(1).minutes.do(send_mail)

while os.path.exists("_fileName_"):
    schedule.run_pending()
    time.sleep(1)
    
"""
