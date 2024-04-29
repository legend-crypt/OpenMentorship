from core.models import Blog


def create_blog(**kwargs):
    """create a blog instance
    """
    try:
        return Blog.objects.create(**kwargs)
    except Exception as e:
        print(e)
    

def update_blog(blog ,**kwargs):
    """Update a blog instance
    """
    for key, value in kwargs.items():
        if hasattr(blog, key):
            if value:
                setattr(blog, key, value)
    blog.save()
    return blog