from django.db import models
from django.utils.translation import gettext_lazy as _


class Feed(models.Model):

    content = models.TextField(help_text="언제는 빼도, [어디]인지는 적어 주세요!")  # 글 내용
    image = models.TextField()  # 피드 이미지
    profile_image = models.TextField()  # 프로필 이미지
    user_id = models.TextField(max_length=100)  # 글쓴이
    user_email = models.CharField(max_length=100, blank=True, help_text="Email 좀 적어 주세요!")
    like_count = models.IntegerField(default=0)  # 좋아요 수

    # class EmailSet(models.TextChoices):
    #     RWKANG = 'RW', _('rwkang@naver.com')
    #     HKYUN = "HK", _('hkyun@naver.com')
    #
    # content = models.TextField(
    #     help_text="언제는 빼도, [어디]인지는 적어 주세요!"
    # )  # 글 내용
    # image = models.TextField()  # 피드 이미지
    # profile_image = models.TextField()  # 프로필 이미지
    # user_id = models.TextField()  # 글쓴이
    # user_email = models.CharField(
    #     max_length=2,
    #     choices=EmailSet.choices,
    #     default=EmailSet.RWKANG,
    #     help_text="Email 좀 적어 주세요!"
    # )

    # like_count = models.IntegerField()  # 좋아요 수
    # user_email = models.TextField(blank=True)  # Email

    # def is_lowerclass(self):
    #     return self.use_email in {
    #         self.EmailSet.RWKANG,
    #         self.EmailSet.HKYUN,
    #     }



# CREATE TABLE `kinstagram`.`connect_feed` (
#   `id` INT NOT NULL AUTO_INCREMENT,
#   `content` VARCHAR(200) NOT NULL,
#   `image` VARCHAR(200) NOT NULL,
#   `profile_image` VARCHAR(200) NOT NULL,
#   `user_id` VARCHAR(100) NOT NULL,
#   `user_email` VARCHAR(100) NULL,
#   `like_count` INT NULL,
#   PRIMARY KEY (`id`));