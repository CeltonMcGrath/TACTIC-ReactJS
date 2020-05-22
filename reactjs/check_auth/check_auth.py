from pyasm.common import Common, jsondumps, jsonloads
from pyasm.web import WebContainer, Widget
from tactic.ui.common import BaseRefreshWdg

__all__ = ['ReactCheckAuthHandler']


class ReactCheckAuthHandler(BaseRefreshWdg):

    def get_content_type(self):
        return "application/json"

    def get_display(self):
        web = WebContainer.get_web()
        web.set_content_type("application/json")
        
        results = {'code': 'LOGIN0001', 'name': '000001'}
 
        widget = Widget()
       
        value = jsondumps(results) 
        widget.add(value)
        self.top = widget
        return widget




if __name__ == "__main__":
    pass
