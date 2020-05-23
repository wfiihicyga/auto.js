/*刷短视频   随机数延时  通用手机滑屏   防封号     QQ:2213159169
  代码如下:                                                   */

  "ui";
  ui.layout(
      <vertical>
    
  <linear padding="5 0 0 0">
                                <Switch id="autoService" textColor="red" text="无障碍服务（注意！必须开启才能正常运行脚本）" checked="{{auto.service != null}}" />
                            </linear>

          <horizontal>
              <checkbox id="快手" text="快手极速版" />
              <input id="kssss" text="110" />
          </horizontal>
    
          <horizontal>
              <checkbox id="抖音" text="抖音极速版" />
              <input id="dysss" text="110" />
          </horizontal>
      
          <horizontal>
              <checkbox id="火山" text="火山极速版" />
              <input id="hssss" text="110" />
          </horizontal>
    
          <button w="*" id="开始" text="点击各平台短视频观看" />
  
      </vertical>
  );
  
  
  ui.开始.on("click", function () {  
      threads.start(UI主界面启动)  
  });

  function UI主界面启动() {
    while (true) {      

        var a = ui.快手.checked,   kssj = ui.kssss.text()
        if (a) {    
            var i = 1;//程序在各个app之间循环的次数      
            while (i > 0) {
                kuaishou.run(kssj)//参数为每次循环刷动的次数
                i--;
            }
        }

        var b = ui.抖音.checked,   dysj = ui.dysss.text()
        if (b) {   
            var i = 1;//程序在各个app之间循环的次数     
            while (i > 0) {
                douyin.run(dysj)//参数为每次循环刷动的次数
                i--;
            }
        }

        var c = ui.火山.checked,  hssj = ui.hssss.text()
        if (c) {
            var i = 1;//程序在各个app之间循环的次数
                     while (i > 0) {
                huoshan.run(hssj)//参数为每次循环刷动的次数
                i--;
            }
        }



    }


}



let kuaishou = {//快手快捷版
    run: function (runTimes) {
        toast('这是一个快手刷视频脚本,1s之后打开APP');
        sleep(1000);
        var launchResult = app.launchApp("快手极速版");//app.launchApp("com.kuaishou.nebula");
        if (!launchResult) {
            toast('你还没有安装快手极速版！');
            sleep(1000)
            return;
        }
        滑动视频(runTimes)
        home();
        sleep(1000);
    }
};




let douyin = {//抖音极速版
    run: function (runTimes) {
        toast('抖音极速版,1s之后打开APP');
        sleep(1000);
        var launchResult = app.launchApp("抖音极速版");//app.launch("com.ss.android.ugc.aweme.lite");
        if (!launchResult) {
            toast('你还没有安装抖音极速版！');
            sleep(1000)
            return;
        }
        滑动视频(runTimes)
        home();
        sleep(1000);
    }
};

let huoshan = {//火山极速版
    // 封装一下
    run: function (runTimes) {
        toast('火山极速版,1s之后打开APP');
        sleep(1000);
        var launchResult = app.launch("com.ss.android.ugc.livelite");
        if (!launchResult) {
            toast('你还没有安装火山极速版！');
            sleep(1000)
            return;
        }
        滑动视频(runTimes)
        home();
        sleep(1000);


    }
};


function 滑动视频(runTimes) {
 
    toast('等待软件打开，3s之后进入下个动作！');
    sleep(3000);
    //var sleepTime = 10;
    // 统计运行次数
    var flagTime = 0;
    while (true) {
        flagTime++;        
        // 超过次数终止程序
        if (flagTime > runTimes) {
            break;
        }
    // 随机时间之后下个视频，避免软件认为是机器人,因为有广告
    // 广告结束之后会有弹窗，因此时间设置短一点 可以防止广告结束
    //变量 简化   设备分辨率 宽   //变量 简化   设备分辨率 高
    var width = device.width,    height = device.height;
    var YSkuan = randNum(20, 80), YSkuan2 = randNum(20, 80);  //宽度 随机数
    var YSgao = randNum(50, 100), YSgao2 = randNum(50, 100);  //高度 随机数
    var sleepTime = randNum(5, 15);                          //变量 延时 随机数
   // log(width), log(height), log(YSkuan), log(YSgao), log(YSkuan2), log(YSgao2), log(sleepTime) //打印输出信息    
    toast(sleepTime.toString() + 's之后跳到下个视频！已经执行 ' + flagTime.toString() + "次");      
    sleep(sleepTime * 1000);                                 //延时 随机数（）秒 
   
    //swipe(width / 2 + YSkuan, height / 5 * 4 + YSgao, width / 2 + YSkuan2, height / 8 + YSgao2, 888 + YSgao);// 通用手机分辨率   向下滑动
    // 通用手机分辨率   向下滑动
    Swipe(device.width / 2 + random(20,80), device.height / 5 * 4 + random(50,80), device.width / 2 + random(20,80), device.height / 8 + random(50,80), 888 + random(100,200));
    }


    function randNum(minnum, maxnum) {
        return Math.floor(minnum + Math.random() * (maxnum - minnum));
    };//获取范围内的随机数
};


ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});