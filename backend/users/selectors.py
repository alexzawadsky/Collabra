from typing import List

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

User = get_user_model()


def get_user_or_404(user_id: int, **fields) -> User:
    return get_object_or_404(User, id=user_id, **fields)


def get_user_links(user: User) -> List[str]:
    return user.links.values_list("link", flat=True)


def is_user_exists(**fields) -> bool:
    return User.objects.filter(**fields).exists()
