from django.contrib import admin

from .models import Team, Member


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("pk", "title", "owner")
    search_fields = ("title", "description")
    empty_value_display = "-empty-"


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ("pk", "user", "team", "is_admin")
    list_filter = ("is_admin",)
    empty_value_display = "-empty-"
