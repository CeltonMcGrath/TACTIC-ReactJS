from pyasm.common import Common, jsondumps, jsonloads
from pyasm.web import WebContainer, Widget
from pyasm.security import Ticket
from pyasm.search import Search
from tactic.ui.common import BaseRefreshWdg

__all__ = ['ReactCheckAuthHandler']


class ReactCheckAuthHandler(BaseRefreshWdg):

    def get_content_type(self):
        return "application/json"

    def get_display(self):
        web = WebContainer.get_web()
        web.set_content_type("application/json")
        web.set_header("Access-Control-Allow-Credentials", "true")
 
        login_ticket = web.get_cookie("login_ticket")
        if not login_ticket:
            raise Exception("No ticket")

        ticket_sobj = Ticket.get_by_valid_key(login_ticket)
        if not ticket_sobj:
            raise Exception("Permission denied")
        
        results = {'code': 'LOGIN0001', 'name': '000001'}
 
        widget = Widget()
       
        value = jsondumps(results) 
        widget.add(value)
        self.top = widget
        return widget




if __name__ == "__main__":
    pass
