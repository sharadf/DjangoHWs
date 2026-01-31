from django import forms
from .models import Note, Tag
from django.core.exceptions import ValidationError

class NoteForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(
        queryset=Tag.objects.all(),
        required=False,
        widget=forms.CheckboxSelectMultiple
    )

    class Meta:
        model = Note
        fields = ['title', 'body', 'tags']

    def clean_title(self):
        title = self.cleaned_data['title']
        qs = Note.objects.filter(title__iexact=title)
        if self.instance.pk:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise ValidationError("Заметка с таким заголовком уже существует.")
        return title
