/*
count time ;
callback: 回调函数；
type : 类型--1:带删除线和不带删除线的；默认为不带；
             2:显示两位数，在同一个element里
two: 一位数显示还是两位数显示
时间数据格式：
/January 12,2006 22:19:35
或者
//1389536375000
或者
60*60*24*10=864000s(单位：秒)
*/
define(function (require, exports, modules) {
    var $ = require("jquery");
    modules.exports = countTime = function(selector, options){
        var defaults = {
            callback : '',
            type : '',
            two : ''
        }
        var settings = $.extend(defaults, options);
        $(selector).each(function () {
            new CountTime(this, settings);
        })
    }
    function CountTime(wrapper, settings) {
        this.init(wrapper, settings);
    };

    CountTime.prototype = {
        init:function (wrapper, settings) {
                 var $self = $(wrapper),
                 time = settings.time || $self.attr("time") || $self.find("[time]").attr("time") ,
                 stime = settings.stime || $self.attr("stime") || $self.find("[stime]").attr("stime") ,
                 $mmid = $self.find("[month=true]"),
                 $did = $self.find("[day=true]"),
                 $hid = $self.find("[hour=true]"),
                 $mid = $self.find("[minute=true]"),
                 $sid = $self.find("[second=true]"),
                 callback = settings.callback,
                 type = settings.type,
                 two = settings.two,
                 circle = settings.circle,
                 end_time = settings.end_time;
                 var mm,d,h,m,s,cTime,t;
                 t = justTime(time);
                 if(!!two){
                    var $d1 = two.d1,
                          $d2 = two.d2,
                          $h1 = two.h1,
                          $h2 = two.h2,
                          $m1 = two.m1,
                          $m2 = two.m2,
                          $s1 = two.s1,
                          $s2 = two.s2;
                 }
                   var count = function() {
                    if (t > 0) {
                        t--;
                    } else if (t == 0) {
                        
                        if(!circle){
                            clearInterval(cTime);
                        }
                        //!! end_time && (t = justTime(end_time));
                        callback && callback($self);
                        return;
                        
                    }else{
                        clearInterval(cTime);
                        return;   
                    }
                    mm = Math.floor(t / 86400 / 30)
                    d = Math.floor(t / 86400);
                    h = Math.floor((t - d * 86400) / 3600);
                    m = Math.floor((t - d * 86400 - h * 3600) / 60);
                    s = Math.floor(t - d * 86400 - h * 3600 - m * 60);
                    if(!two){
                        if (!type) {
                            html($mmid, mm);
                            html($did, d);
                            html($hid, h);
                            html($mid, m);
                            html($sid, s);
                         } else if (type == 1) {
                            html($mmid, mm, "<del></del>");
                            html($did, d, "<del></del>");
                            html($hid, h, "<del></del>");
                            html($mid, m, "<del></del>");
                            html($sid, s, "<del></del>");
                         } else if( type==2){
                            d = d.toString();
                            h = h.toString();
                            m = m.toString();
                            s = s.toString();
                            d = set(d);                          
                            h = set(h);
                            m = set(m);
                            s = set(s);
                            html($mmid, mm);
                            html($did, d);
                            html($hid, h);
                            html($mid, m);
                            html($sid, s);
                         }
                    }else{
                          d = d.toString();
                          h = h.toString();
                          m = m.toString();
                          s = s.toString();
                          d = set(d);                          
                          h = set(h);
                          m = set(m);
                          s = set(s);
                          html($d1, d.slice(0,1));
                          html($d2, d.slice(1,2));
                          html($h1, h.slice(0,1));
                          html($h2, h.slice(1,2));
                          html($m1, m.slice(0,1));
                          html($m2, m.slice(1,2));
                          html($s1, s.slice(0,1));
                          html($s2, s.slice(1,2));
                    }
                    cTime = setTimeout(count, 1000);
                }

                setTimeout(count, 1000);
                function set(data){
                    return data.length == 1 ? '0'+data : data;
                }
                function html(jq, num, strs) {
                    if (!jq ||  jq.length <= 0 ) return;
                    if ( !arguments[2]) {
                        jq.html(num);
                    } else {
                        jq.html(num + strs);
                    }
                }
                function justTime(time){
                   var t, c;
                   if(!!!time || time<=0){
                     return;
                   }else if(~time.toString().indexOf('/')){
                       if( !time.toString().indexOf('//') ){
                           time = parseInt( time.toString().slice( 2, time.toString().length ) );
                       }
                     c  = stime ? (new Date(stime).getTime()) : (new Date().getTime());
                     t  = parseInt((new Date(time).getTime()- c)/1000);
                     if(isNaN(t) || t<=0){
                        return;
                     }else{
                       return t;   
                     }
                  }else{
                      t  = parseInt(time); 
                      if(isNaN(t)){
                        return;
                      }else{
                        return t;  
                      }
                  } 
                    
                }
            }
        }

});