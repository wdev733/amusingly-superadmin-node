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

        html += '<img src="' + siteUrl + 'resizecrop/' + imageList[i].ImageUrl + '" class="img-responsive" alt="' + imageList[i].ImageID + '">';

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
