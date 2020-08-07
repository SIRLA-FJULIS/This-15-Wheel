(function($) {
  $.fn.extend({

    roulette: function(count, options) {

      var defaults = {
        angle: 0,
        angleOffset: 0,
        speed: 5000,
        easing: "easeInOutElastic",
      };

      var opt = $.extend(defaults, options);

      return this.each(function() {
        var o = opt;

        var data = [
					{
            color: '#FF6670',
            text: '夜猫'
          },
          {
            color: '#FF6670',
            text: '土豆'
          },
          {
            color: '#FF6670',
            text: '統神'
          },
          {
            color: '#FF6670',
            text: 'Arashi'
          },
          {
            color: '#FF6670',
            text: 'Yan'
          },
          {
            color: '#FF6670',
            text: '叔叔'
          },
          {
            color: '#FFD000',
            text: 'UR🍐'
          },
          {
            color: '#FFD000',
            text: '許羊'
          },
          {
            color: '#FFD000',
            text: '琪雅'
          },
          {
            color: '#FFD000',
            text: '🐟'
          },
          {
            color: '#FFD000',
            text: '辣母羊'
          },
          {
            color: '#77A88D',
            text: 'ㄇㄒ'
          },
          {
            color: '#77A88D',
            text: 'cuboid'
          }
        ];

        for(let c in count){
          for(let d of data){
            if(d.text === c) {
              d.count = count[c];
            }
          }
        }

        function shuffle(array){
          color = ['#FF6670', '#FFD000', '77A88D'] ;
          for(let i = array.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        }
        shuffle(data);

        var $wrap = $(this);
        var $btnStart = $wrap.find("#btn-start");
        var $roulette = $wrap.find(".roulette");
        var wrapW = $wrap.width();
        var angle = o.angle;
        var angleOffset = o.angleOffset;
        var speed = o.speed;
        var esing = o.easing;
        var itemSize = data.length;
        var itemSelector = "item";
        var labelSelector = "label";
        var d = 360 / itemSize;
        var borderTopWidth = wrapW;
        var borderRightWidth = tanDeg(d);

        for (i = 1; i <= itemSize; i += 1) {
          var idx = i - 1;
          var rt = idx * d + angleOffset;

          /* Give every data an angle range */
          data[idx].angle_range = [rt, rt + d];

          var itemHTML = $('<div class="' + itemSelector + '">');
          var labelHTML = '';
              labelHTML += '<p class="' + labelSelector + '">';
              labelHTML += '  <span class="count">' + data[idx].count + '<\/span>';
              labelHTML += '	<span class="text">' + data[idx].text + '<\/span>';
              labelHTML += '<\/p>';

          // background of wheel
          $roulette.append(itemHTML);
          $roulette.children("." + itemSelector).eq(idx).append(labelHTML);
          $roulette.children("." + itemSelector).eq(idx).css({
            "left": wrapW / 2,
            "top": -wrapW / 2,
            "border-top-width": borderTopWidth,
            "border-right-width": borderRightWidth,
            "border-top-color": data[idx].color,
            "transform": "rotate(" + rt + "deg)"
          });

          var textH = parseInt(((2 * Math.PI * wrapW) / d) * .6);

          $roulette.children("." + itemSelector).eq(idx).children("." + labelSelector).css({
            "height": textH + 'px',
            "line-height": textH + 'px',
            "transform": 'translateX(' + (textH * 0.88) + 'px) translateY(' + (wrapW * -.42) + 'px) rotateZ(' + (90 + d * .5) + 'deg)'
          });

        }

        function tanDeg(deg) {
          var rad = deg * Math.PI / 180;
          return wrapW / (1 / Math.tan(rad));
        }


        $btnStart.on("click", function() {
          rotation();
        });

        function rotation() {

          var completeA = 360 * r(5, 10) + r(0, 360);

          $roulette.rotate({
            angle: angle,
            animateTo: completeA,
            center: ["50%", "50%"],
            easing: $.easing.esing,
            callback: function() {
              var currentA = $(this).getRotateAngle() % 360;
              for(d of data){
                if(360 - currentA > d.angle_range[0] && 360 - currentA < d.angle_range[1]){
                    $("#result").text(`恭喜${d.text}，您已被幸運SIRLA喵造訪!`);
                    break;
                }
              }

            },
            duration: speed
          });
        }

        function r(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

      });
    }
  });
})(jQuery);

$(function() {
  $.ajax({
    url: 'https://sirla-web-api.herokuapp.com/get_count',
    type: 'GET',
    dataType: 'jsonp'
  }).then(resp => {
    $('.box-roulette').roulette(resp);
  }) ;

});