# -*- coding: UTF-8 -*-
import sys
import facebook
import urllib
import subprocess
import warnings
import json
from dateutil.parser import parse
from dateutil.tz import *
import datetime
oauth_access_token=sys.argv[1]
#oauth_access_token="EAAObERiJwy0BANwbSrhQU4kYfZBDnmQ8ZBdliYpDnj8E5Nksv1Ur4wBQP2yXPeZCVWZBwNOHGSruWh6qMyfGlmONAovrBAjJOtQj2Xb0ZBgdwrhPTJrff8ino26ZAPgdnioVppMSb4NZA7rJpZAWIL7ErZAfvzlAJAOpxiaCZAW89THwZDZD"
facebook_graph = facebook.GraphAPI(oauth_access_token, version='2.7')


try:
    posts=facebook_graph.get_connections(id='me',connection_name='posts')
#    print(posts)
    data=[]
    for post in posts['data']:
        tmp={}
        if "message" in post:
            tmp['message']=post['message']
            print(tmp)
            #d=parse(post['created_time'])
            #d=d+datetime.timedelta(hours=8)
            #d=datetime.datetime(d.year,d.month,d.day,d.hour,d.minute,d.second,tzinfo=tzoffset('GMT',-28800))
            #tmp['created_time']=str(d)
            data.append(tmp)
    print(data)
    #js=json.dumps(data)
    #print(js)
except facebook.GraphAPIError as e:
    print('Something went wrong:', e.type, e.message,'123')
