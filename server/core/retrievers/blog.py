from core.models import Blog

def get_blog_by_id(id):
    """Get a Blog instance by id"""
    try:
        return Blog.objects.get(blog_id=id)
    except Blog.DoesNotExist:
        return None
    

def get_all_blogs():
    "retrieve all blog instance"
    return Blog.objects.all()

def get_blog_information(blog):
    return {
        'id': blog.blog_id,
        'title': blog.title,
        'content': blog.content,
        'author': blog.author.full_name,
        'thumbnail': blog.thumbnail.url if blog.thumbnail else None,
        'author_image': blog.author.profile.profile_picture.url if blog.author.profile else None
    }
    
    
def get_all_blogs_information(blogs):
    data = []
    for blog in blogs:
        data.append(get_blog_information(blog))  
    return data