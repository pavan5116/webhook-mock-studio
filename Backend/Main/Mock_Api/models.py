from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify



HTTP_STATUS_CHOICES = [
    (200, "200 OK"),
    (201, "201 Created"),
    (204, "204 No Content"),
    (400, "400 Bad Request"),
    (401, "401 Unauthorized"),
    (403, "403 Forbidden"),
    (404, "404 Not Found"),
    (500, "500 Internal Server Error"),
]




class MockAPI(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    endpoint_id =models.CharField(max_length= 50)
    method = models.CharField(max_length=10, choices=[
        ("GET", "GET"),
        ("POST", "POST"),
        ("PUT", "PUT"),
        ("PATCH", "PATCH"),
        ("DELETE", "DELETE")
    ])
    response_body = models.JSONField()
    status_code = models.IntegerField(HTTP_STATUS_CHOICES)
    headers = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)



    class Meta:
        unique_together=["user", "endpoint_id", "method"]
    
    def save(self, *args, **kwargs):
        if self.endpoint_id:
            clean = slugify(self.endpoint_id)
            self.endpoint_id=clean.replace("-","/")
        super().save(*args, **kwargs)


    def __str__(self):
        return str(self.user)


class RequestAPI(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    endpoint = models.ForeignKey(MockAPI, on_delete=models.CASCADE) 

    method =models.CharField(max_length=10)

    status = models.IntegerField()

    headers = models.JSONField()

    body = models.JSONField(null=True, blank=True)

    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.method)

