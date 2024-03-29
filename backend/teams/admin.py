from django.contrib import admin

from .models import Team, Member, Role, Action


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("pk", "title", "owner", "color", "slug")
    search_fields = ("title", "slug", "description")
    empty_value_display = "-empty-"


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ("pk", "user", "role", "team")
    empty_value_display = "-empty-"


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("pk", "title", "team", "is_custom")
    list_filter = ("is_custom",)
    search_fields = ("title",)
    empty_value_display = "-empty-"


@admin.register(Action)
class ActionAdmin(admin.ModelAdmin):
    list_display = ("pk", "key")
    search_fields = ("key",)
    empty_value_display = "-empty-"
