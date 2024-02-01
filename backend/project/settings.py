import os
from datetime import timedelta
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(".env")

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = True

if not os.environ.get("DOCKER_ENV", None):
    IS_LOCAL = True
else:
    IS_LOCAL = False

if DEBUG:
    SECRET_KEY = "test"
else:
    SECRET_KEY = os.getenv("SECRET_KEY")

ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = ["http://localhost:8241"]


INSTALLED_APPS = [
    "core",
    # "modeltranslation",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_dump_load_utf8",
    "rest_framework",
    "users",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "project.urls"


DATA_URL = "data/"
DATA_ROOT = os.path.join(BASE_DIR, "core", "data")

STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "core", "static"),
]

TEMPLATES_DIR = os.path.join(BASE_DIR, "core", "templates")

MEDIA_URL = "media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "core", "data", "media")

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [TEMPLATES_DIR],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "project.wsgi.application"
ASGI_APPLICATION = "grocket.asgi.application"

AUTH_USER_MODEL = "users.User"

if IS_LOCAL:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": os.getenv("DB_ENGINE"),
            "NAME": os.getenv("DB_NAME"),
            "USER": os.getenv("POSTGRES_USER"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
            "HOST": os.getenv("DB_HOST"),
            "PORT": os.getenv("DB_PORT"),
        }
    }


AUTH_PASSWORD_VALIDATORS = [
    # {
    #     "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    # },
]


LANGUAGES = [
    ("en", "English"),
    ("ru", "Russian"),
]

LOCALE_PATHS = [
    BASE_DIR / "core/locale/",
]

MODELTRANSLATION_DEFAULT_LANGUAGE = "en"

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": ...,
    "PAGE_SIZE": ...,
    "EXCEPTION_HANDLER": "rest_framework.views.exception_handler",
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {"anon": "100000/day", "user": "100000/day"},
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=100000),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=100000),
    "UPDATE_LAST_LOGIN": False,
    "AUTH_HEADER_TYPES": ("Bearer",),
}


AVATAR = {
    "COLORS": [
        "#fca5a5",
        "#fdba74",
        "#fcd34d",
        "#bef264",
        "#86efac",
        "#5eead4",
        "#67e8f9",
        "#7dd3fc",
        "#93c5fd",
        "#a5b4fc",
        "#c4b5fd",
        "#f0abfc",
        "#f9a8d4",
        "#fda4af",
    ],
    "SIZE": (500, 500),
    "FORMAT": "webp",
    "FONT_URL": os.path.join(STATIC_ROOT, "fonts"),
    "FONT_FILE_NAME": "arial_black.ttf",
    "FONT_SIZE": 200,
    "FONT_FILL": "#1C0606",
}
