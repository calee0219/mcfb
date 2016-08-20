package main

import (
    "fmt"
    "html/template"
    "log"
    "net/http"
   // "strings"
)
/*
func about(res http.ResponseWriter, req *http.Request){
    if req.Method == "GET" {
        t, _ := template.ParseFiles("./html/about.html")
        t.Execute(res, nil)
    }
}
*/

func play(res http.ResponseWriter, req *http.Request) {
    fmt.Println("method:", req.Method) //获取请求的方法
    if req.Method == "GET" {
        t, _ := template.ParseFiles("index.html")
        t.Execute(res, nil)
    } else {
        //请求的是登陆数据，那么执行登陆的逻辑判断
        req.ParseForm()
        fmt.Println(req.Form)
        //fmt.Println( req.Form["name"][0])
        //fmt.Println(req.Form["text"][0])
    }
}

func main() {
    http.HandleFunc("/play",play)       //设置访问的路由
    //http.HandleFunc("/html/about.html", about)         //设置访问的路由
    err := http.ListenAndServe(":9090", nil) //设置监听的端口
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
