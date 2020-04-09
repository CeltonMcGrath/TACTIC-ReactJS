
import tacticenv
from pyasm.web import Widget
from pyasm.common import Environment
from pyasm.biz import ProjectSetting


__all__ = ['ReactWdg']

class ReactWdg(Widget):


    def __init__(self, **kwargs):
        self.kwargs = kwargs
        super(ReactWdg, self).__init__()
        print(kwargs)


    def get_display(self):

        widget = Widget() 

        plugin_dir = Environment.get_plugin_dir()
        app_dir = ProjectSetting.get_value_by_key("reactjs/index")
        application_file = "%s/%s" % (plugin_dir, app_dir)
        html = r'''%s''' %(open(application_file).read())
        widget.add(html)
        return widget


"""
class ReactWdgTest:
    
    def test(self):
        top_wdg = ReactWdg()
        top_wdg_html = top_wdg.get_buffer_display()

        plugin_dir = Environment.get_plugin_dir()
        application_file = "%s/tactic-react/my-app/index.html" % plugin_dir
        html = r'''%s''' %(open(application_file).read())

        print(top_wdg_html == html)
   
    
"""

if __name__ == '__main__':
    #test = ReactWdgTest()
    #test.test()

    top_wdg = ReactWdg()


    
