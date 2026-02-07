from django import template
import math

register = template.Library()

@register.filter
def readtime(text):
    words = len(text.split())
    minutes = math.ceil(words / 200)  # 200 wpm
    return f"~{minutes} мин"
