import { handleError, handleSuccess } from '../../services/response';
import Widget from '../v_client/widget/model';
import Customer from '../v_admin/customer/model';

export const getWidgetByKey = async (req, res, next) => {
  try {
    const key = req.query.key;
    const callback = req.query.callback;

    if (key !== undefined && callback !== undefined) {
      res.setHeader('content-type', 'text/javascript');

      var html = '<h1>hello, this is widget ' + key + '</h1>';

      var result = {
        'html': html
      };

      res.end(callback + '(' + JSON.stringify(result) + ');');

    } else {
      handleSuccess(res);
    }
    // const widget = await Widget.getWidgetByKey(key);

    // const imageList = await Widget.getImagesForWidget(widget.embed_id);

    // res.setHeader('content-type', 'text/javascript');
    // res.end("alert('ddd');");
    // handleSuccess(res, { data: { ...widget, images: imageList } });
  } catch (err) {
    handleError(res, err);
  }
};
