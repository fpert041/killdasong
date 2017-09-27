from django.shortcuts import render
from django.views.generic import View, CreateView,DetailView,ListView, UpdateView,TemplateView
# from django.template.context_processors import csrf
from django.template.response import TemplateResponse
from django.template import RequestContext,Context
from .models import Song


# Create your views here

class IndexView(ListView):
	template_name = "index.html"
	model = Song

	# def get(self,request,*args, **kwargs):
	# 	response = TemplateResponse()
	# 	return response 

	def get_context_data(self, **kwargs):
		context = super(IndexView, self).get_context_data(**kwargs)
		# context['groups'] = Group.objects.all()
		# context['groupscreated'] = Group.object
		return context

	# def get(self, request, **kwargs):
	# 	self.object = self.get_object()
	# 	if not self.object.is_active:
	# 		return HttpResponseRedirect('/') # or something else
	# 	context = self.get_context_data(object=self.object)
	# 	return self.render_to_response(context)



	# def post(self, request, *args, **kwargs):
	# 	self.object = self.get_object()
	# 	# print request.POST
	# 	context = self.get_context_data(object=self.object)
	# 	return self.render_to_response(context)

  # def get_template_name(self): 
  #   return "index.html"

class SongView(ListView):

	template_name = "song.html"
	context_object_name = 'Song'
	
	def get_context_data(self, **kwargs):
		context = super(SongView, self).get_context_data(**kwargs)
		# context['id'] = self.getUserId(self)
		# context['groups'] = Group.objects.filter(created_by = self.request.user)
		# print context['id'] 
		return context

	def get_queryset(self):
		return Song.objects.all()

	# def getUserId(self,request):
	# 	name = self.request.user.id
	# 	return name
