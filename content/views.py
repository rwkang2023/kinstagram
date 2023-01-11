import os
from uuid import uuid4

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from content.models import Feed
from kinstagram.settings import MEDIA_ROOT


class Main(APIView):
    def get(self, request):
        # feed_list = Feed.objects.all().order_by("-id")
        return render(request, "kinstagram.main.html")

class FeedUpload(APIView):
    def post(self, request):
        file = request.FILE("file")

        # 2023.01.09 Conclusion. "media" 폴더에 "파일" 저장할 때… 아래와 같이 "uuid4().hex" 펑션을 사용하는 이유는,
        # 사용자가 임의로 정한 파일명에 "특수 문자" 또는 "한국어" 등이 포함되어 있을 수 있으므로,
        # 이것을 제거하고 "유니크"한 "영어+숫자"로만 구성된 파일명을 정해 주기 위해 사용한다…
        # 특수 문자 또는 한글 등이 파일명에 포함되어 있을 경우, 조회할 때 에러가 날 수 있기 때문이다.
        # 또한 db.table에는 "순수 파일명"만 저장하고, "media path" 경로는 ".html" 파일에서,
        # src = "{% get_media_prefix %} {{ feed.image }} 이런식으로, "get_media_prefix" 를 사용한다.
        # 단, 이것의 사용을 위해서는, 먼저 {% load static %}를 반드시 선언해 주어야 한다.
        uuid_name = uuid4().hex
        save_path = os.path.join(MEDIA_ROOT, uuid_name)
        # low level language : 파일 쓸 때 사용...
        with open(save_path, "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        content = request.data.get("content")
        image = request.data.get("image")
        profile_image = request.data.get("profile_image")
        user_id = request.data.get("user_id")
        user_email = request.data.get("user_email")
        like_count = 0
        print("image: ", image)
        print("user_email: ", user_email)
        print("like_count: ", like_count)

        Feed.objects.create(content=content,
                            profile_image=profile_image,
                            user_id=user_id,
                            user_email=user_email,
                            like_count=like_count)

        return Response(status=200)
