from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.views.decorators.cache import cache_page, never_cache
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.db.models import Q
from django.contrib.auth import logout
from django.shortcuts import redirect
from .models import Note, Tag
from .forms import NoteForm

@never_cache
def note_list(request):
    notes = Note.objects.all().order_by('-created_at')
    q = request.GET.get('q')
    if q:
        notes = notes.filter(Q(title__icontains=q) | Q(body__icontains=q))

    paginator = Paginator(notes, 5)
    page = request.GET.get('page')
    page_obj = paginator.get_page(page)
    return render(request, 'notes/note_list.html', {'page_obj': page_obj, 'query': q})


def note_detail(request, pk):
    note = get_object_or_404(Note, pk=pk)
    return render(request, 'notes/note_detail.html', {'note': note})


@login_required
def note_create(request):
    if request.method == 'POST':
        form = NoteForm(request.POST)
        if form.is_valid():
            note = form.save()
            messages.success(request, 'Заметка успешно создана.')
            return redirect('note_detail', pk=note.pk)
        messages.error(request, 'Ошибка при создании заметки.')
    else:
        form = NoteForm()
    return render(request, 'notes/note_form.html', {'form': form})


@login_required
def note_edit(request, pk):
    note = get_object_or_404(Note, pk=pk)
    if request.method == 'POST':
        form = NoteForm(request.POST, instance=note)
        if form.is_valid():
            form.save()
            messages.success(request, 'Заметка обновлена.')
            return redirect('note_detail', pk=note.pk)
        messages.error(request, 'Ошибка при сохранении.')
    else:
        form = NoteForm(instance=note)
    return render(request, 'notes/note_form.html', {'form': form, 'note': note})


@login_required
def note_delete(request, pk):
    note = get_object_or_404(Note, pk=pk)
    if request.method == 'POST':
        note.delete()
        messages.success(request, 'Заметка удалена.')
        return redirect('note_list')
    return render(request, 'notes/note_confirm_delete.html', {'note': note})


def notes_by_tag(request, slug):
    tag = get_object_or_404(Tag, slug=slug)
    notes = tag.notes.all().order_by('-created_at')
    paginator = Paginator(notes, 5)
    page = request.GET.get('page')
    page_obj = paginator.get_page(page)

    return render(request, 'notes/note_list.html', {'page_obj': page_obj, 'tag': tag})


def search_notes(request):
    query = request.GET.get('q')
    notes = Note.objects.all()
    if query:
        notes = notes.filter(Q(title__icontains=query) | Q(body__icontains=query))
    return render(request, 'notes/note_list.html', {'page_obj': notes, 'query': query})


def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Аккаунт успешно создан!')
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'notes/signup.html', {'form': form})



def logout_view(request):
    logout(request)
    return redirect('login')