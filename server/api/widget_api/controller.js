import { handleError, handleSuccess } from '../../services/response';
import Widget from '../v_client/widget/model';
import Customer from '../v_admin/customer/model';

export const getWidgetByKey = async (req, res) => {
  try {
    const key = req.query.key;
    const callback = req.query.callback;

    if (key === undefined || callback === undefined) {
      handleSuccess(res);
      return;
    }

    res.setHeader('content-type', 'text/javascript');

    const widget = await Widget.getWidgetByKey(key);
    const customer = await Customer.getCustomerById(widget.customer_id);

    var html = '';
    var result = {};

    if (customer.Status !== 1) {
      html =
        "<h1 style='text-align:center;'>Your Account has been Suspended</h1>";
      result = {
        html
      };
      res.end(callback + '(' + JSON.stringify(result) + ');');
      return;
    }

    const siteUrl = 'https://www.amusingly.com/user/';
    const imageList = await Widget.getWidgetSyncImages(widget.embed_id);

    html = '';

    if (imageList.length > 0) {
      html += '<div class="sync_data_container">';

      for (let i=0; i < imageList.length; i++) { 
        html += '<div class="cont_img_container">';
        html += '<div class="cont_img">';

        if (imageList[i].RefUrl) {
          html += '<a href="' + imageList[i].RefUrl + '">';
        }

        // html += '<img src="' + siteUrl + 'resizecrop/' + imageList[i].ImageUrl + '" class="img-responsive" alt="' + imageList[i].ImageID + '">';
        html += '<img src="' + imageList[i].ImageInstaUrl + '" class="img-responsive" alt="' + imageList[i].ImageID + '">';

        if (imageList[i].RefUrl) {
          html += '</a>';
        }

        html += '</div>';
        html += '</div>';
      }

      html += '</div>';
    }

    result = {
      html
    };

    res.end(callback + '(' + JSON.stringify(result) + ');');
  } catch (err) {
    handleError(res, err);
  }
};

export const getWidgetSliderByKey = async (req, res) => {
  try {
    const key = req.query.key;
    const callback = req.query.callback;

    if (key === undefined || callback === undefined) {
      handleSuccess(res);
      return;
    }

    res.setHeader('content-type', 'text/javascript');

    const widget = await Widget.getWidgetByKey(key);
    const customer = await Customer.getCustomerById(widget.customer_id);

    var html = '';
    var result = {};

    if (customer.Status !== 1) {
      html =
        "<h1 style='text-align:center;'>Your Account has been Suspended</h1>";
      result = {
        html
      };
      res.end(callback + '(' + JSON.stringify(result) + ');');
      return;
    }

    const siteUrl = 'https://www.amusingly.com/user/';
    const instaUrl = '//instagram.com/';
    
    const imageList = await Widget.getWidgetSyncSliderImages(widget.embed_id);

    html = '';
    var amImgData = [];

    if (imageList.length > 0) {
      html += '<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Raleway:100,300,400,500,700,600" />';
      html += '<div class="am-slider-container am-slider-container" style="background-color:' + widget.backcolor + '">';

      html += '<div class="am-slider-wrapper">';
      html += '<div id="am-slider" class="owl-carousel">';

      for (let i = 0; i < imageList.length; i++) {
        const obj = {
          href: imageList[i].ImageInstaUrl,
          caption: imageList[i].ImageCaption,
          link1_url: imageList[i].link1_url,
          link1_title: imageList[i].link1_title,
          link1_image: imageList[i].link1_image,
          link2_url: imageList[i].link2_url,
          link2_title: imageList[i].link2_title,
          link2_image: imageList[i].link2_image,
          link3_url: imageList[i].link3_url,
          link3_title: imageList[i].link3_title,
          link3_image: imageList[i].link3_image,
          link4_url: imageList[i].link4_url,
          link4_title: imageList[i].link4_title,
          link4_image: imageList[i].link4_image,
          link5_url: imageList[i].link5_url,
          link5_title: imageList[i].link5_title,
          link5_image: imageList[i].link5_image,
          link6_url: imageList[i].link6_url,
          link6_title: imageList[i].link6_title,
          link6_image: imageList[i].link6_image,
          txtcolor: widget.txtcolor,
          video: imageList[i].VideoUrl
        };

        amImgData[imageList[i].CustomerInstaID] = obj;
        
        html += '<div class="item">';
        if (imageList[i].popup != 'no') {
         	html += '<a class="inline am-group" href="#inline-popup-content" data-id="' + imageList[i].CustomerInstaID  + '">';
			  }
        
        html += '<img src="' + imageList[i].ImageInstaUrl + '" class="img-responsive" alt="' + imageList[i].Link + '">';
            
        if(imageList[i].VideoUrl != '') { 
	        html += '<span class="locate_video">' +
	         	  '<img src="https://www.amusingly.com/user/images/play-icon.png">' +
						'</span>';
	      }
         
        if(imageList[i].popup != 'no') {
          html += '</a>';
			  }
			  html += '</div>';
		  } 
      html += '</div>';
      html += '</div>';
      html += '</div>';

      //preloading images
		  var profileLogo = "";
		  if(customer.ProfileLogo) {
        profileLogo = '<a target="_blank" href="' + instaUrl + customer.UserName  + '" class="author-info blank_link"><img src="' + siteUrl + customer.ProfileLogo + '" class="author-avatar default_avatar" /></a>';
      }
		
		  html += '<div style="display:none">';

      html += 
			  '<div id="inline-popup-content">' +
				  '<div class="am-popuop-wrapper">' +
						'<div class="am-left">' +
							'<div class="am-featured-photo">' +
								'<img src="" class="am-main-image" id="am_p_image">' +
								'<video controls="controls" autoplay src="" class="am-main-video" type="video/mp4" playsinline="" loop="" id="am_p_video"/>' +
		          '</div>' +
						'</div>' +
						'<div class="am-right">' +
							'<div class="author">' +
								profileLogo +
								'<div class="author-names">' +
									'<a target="_blank" href="' + instaUrl + customer.UserName + '" class="author-handlename">' + customer.UserName + '</a>' +
									'<span href="https://instagram.com/p/7iO1RWrqRv/" class="author-realname blank_link"><span style="color:' + widget.txtcolor + '">' + customer.InstaProfileName + '</span></span>' +
								'</div>' +
							'</div>' +
							'<p class="photo-caption" id="am_p_caption" style="color:' + widget.txtcolor + '">Image description</p>' +
							'<div class="pop_product_list">' +
							'</div>';
			if(widget.socialsharing != 'no') {
        html += 
          '<div class="am-sharing">' +
            '<ul>' +
              '<li>' +
                '<a href="http://www.facebook.com/sharer.php?u=https://www.instagram.com/' + Customer.UserName + 'p[url]=www.google.com" target="_blank" class="sharing-fb"><img src="https://www.amusingly.com/user/images/fb-api.png" alt="FB"/><span>SHARE</span></a>' +
              '</li>' +
              '<li class="am-border">' +
                '<a target="_blank" href="https://twitter.com/share?url=https://www.instagram.com/' + Customer.UserName + '&amp;text=' + Customer.UserName + ';" class="sharing-tw"><img src="https://www.amusingly.com/user/images/tw-api.png" alt="TW"/><span>TWEET</span></a>' +
              '</li>' +
              '<li>' +
                '<input type="hidden" class="urlkey" value="' + Customer.UserName + '"/>' +
                '<a target="_blank" href="https://www.pinterest.com/pin/create/button/?url=https://www.instagram.com/' + Customer.UserName + '&media=https%3A%2F%2Ffarm8.staticflickr.com%2F7027%2F6851755809_df5b2051c9_z.jpg&description=' + Customer.UserName + '" class="sharing-pi"><img src="https://www.amusingly.com/user/images/pt-api.png" alt="PT"/><span>PIN IT</span></a>' +
              '</li>' +
            '</ul>' +
          '</div>';
      }
      
      html += '<a href="' + siteUrl + '" class="am-powered" target="_blank"><img src="https://www.amusingly.com/user/images/poweredby-api.png" alt="poweredby amusingly"/></a>' +
							'<div class="am-buynow">' +
								'<ul>' +
		              '<li>' +
		                '<a href="#" class="buynow" id="am_p_buynow">BUY NOW</a>' +
									'</li>' +
								'</ul>' +
							'</div>' +
						'</div>' +
				  '</div>' +
			  '</div>';
		  html += '</div>';
    
      html += '<script type="text/javascript">var am_img_data = ' + JSON.stringify(amImgData) + ';</script>';
    }

    var result = {
      html
    };

    res.end(callback + '(' + JSON.stringify(result) + ');');
  } catch (err) {
    handleError(res, err);
  }
};
