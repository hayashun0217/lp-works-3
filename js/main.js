$(function() {
  //drawer-js
  $(document).ready(function() {
      $('.drawer').drawer()
  })

  $(".drawer-hamburger").click(function() {
    // cssで背景色を切り替え
  });

  jQuery('a[href^="#"]').click(function() {
    // 移動速度を指定（ミリ秒）
    let speed = 300;
    // hrefで指定されたidを取得
    let id = jQuery(this).attr("href");
    // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
    let target = jQuery("#" == id ? "html" : id);
    // ページのトップを基準にターゲットの位置を取得
    let position = jQuery(target).offset().top;
    // ターゲットの位置までspeedの速度で移動
    jQuery("html, body").animate(
      {
        scrollTop: position - $( '#js-header' ).outerHeight()
    },
      speed
    );
    return false;
  });

  
  jQuery('.q-a-question').on('click',function() {
    jQuery(this).next().slideToggle();
    jQuery(this).children('.drawer-icon').toggleClass('is-open');
  });
  
  

  let mySwiper = new Swiper('.swiper', {
    // 以下にオプションを設定
    loop: true, //最後に達したら先頭に戻る
    
    //ページネーション表示の設定
    pagination: {
      el: '.swiper-pagination', //ページネーションの要素
      type: 'bullets', //ページネーションの種類
      clickable: true, //クリックに反応させる
    },
    breakpoints: {
      // 768px以上の場合
      300: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },

      1100: {
        slidesPerView: 2.7,
        spaceBetween: 55,
      }
    }



  });

  //contact-form
  let $form = $( '#js-form' )  //ここは独自に指定
  $form.submit(function(e) { 
    $.ajax({ 
      url: $form.attr('action'), 
      data: $form.serialize(), 
      type: "POST", 
      dataType: "xml", 
      statusCode: { 
        0: function() { 
          //送信に成功したときの処理 
          //ここは独自に指定
          $form.slideUp()                 
          $('#js-success').slideDown()
        }, 
        200: function() { 
          //送信に失敗したときの処理 
          //ここは独自に指定
          $form.slideUp()
          $('#js-error').slideDown()
        }
      } 
    });
    return false; 

  });
  


});