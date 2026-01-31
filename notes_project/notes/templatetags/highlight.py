from django import template
import re
from django.utils.safestring import mark_safe
from django.utils.html import escape

register = template.Library()

@register.filter
def highlight(text, query):
    if not query:
        return text
    q = re.escape(query)
    pattern = re.compile(q, re.IGNORECASE)
    def repl(m):
        return f"<mark>{escape(m.group(0))}</mark>"
    result = pattern.sub(repl, text)
    return mark_safe(result)
