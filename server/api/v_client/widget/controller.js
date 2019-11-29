import { handleLogout, handleError, handleSuccess } from '../../../services/response';
import Widget from './model';
import Customer from '../../v_admin/customer/model';

export const getWidget = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.replace('Bearer ', '');

    const customer = await Customer.getCustomerByAccessToken(accessToken);

    if (customer === false) {
      return handleLogout(res)
    }

    const widget = await Widget.getWidgetById(req.params._id)

    handleSuccess(res, { data: widget });
  } catch (err) {
    handleError(res, err);
  }
};

export const getWidgetList = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.replace('Bearer ', '');

    const customer = await Customer.getCustomerByAccessToken(accessToken);

    if (customer === false) {
      return handleLogout(res)
    }

    const widgetList = await Widget.getWidgetListByCustomerID(customer.CustomerID)

    handleSuccess(res, { data: widgetList });
  } catch (err) {
    handleError(res, err);
  }
};

export const addNewWidget = async (req, res, next) => {
  try {

    const { authorization } = req.headers;
    const accessToken = authorization.replace('Bearer ', '');

    const customer = await Customer.getCustomerByAccessToken(accessToken);

    if (customer === false) {
      return handleLogout(res)
    }

    const { backcolor, txtcolor, popup, socialsharing, widget_type, widget_style, widget_fullpage, thumbnail,
      layout_row, layout_column, hover_effect, embed_padding, embed_width } = req.body;

    await Widget.addNewWidget(customer.CustomerID, 0, backcolor, txtcolor, popup, socialsharing, widget_type, 
      widget_style, widget_fullpage, thumbnail, layout_row, layout_column, hover_effect, embed_padding, embed_width);

    handleSuccess(res, { });
  } catch (err) {
    handleError(res, err);
  }
};

export const updateWidget = async (req, res, next) => {
  try {

    const { authorization } = req.headers;
    const accessToken = authorization.replace('Bearer ', '');

    const customer = await Customer.getCustomerByAccessToken(accessToken);

    if (customer === false) {
      return handleLogout(res)
    }

    const { embed_id, backcolor, txtcolor, popup, socialsharing, widget_type, widget_style, widget_fullpage,
      thumbnail, layout_row, layout_column, hover_effect, embed_padding, embed_width } = req.body

    await Widget.updateWidget(embed_id, backcolor, txtcolor, popup, socialsharing, widget_type, widget_style, 
      widget_fullpage, thumbnail, layout_row, layout_column, hover_effect, embed_padding, embed_width);

    handleSuccess(res, { });
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteWidget = async (req, res, next) => {
  try {

    const { authorization } = req.headers;
    const accessToken = authorization.replace('Bearer ', '');

    const customer = await Customer.getCustomerByAccessToken(accessToken);

    if (customer === false) {
      return handleLogout(res)
    }

    const { embed_id } = req.body;

    await Widget.deleteWidgetById(embed_id);

    handleSuccess(res, { });
  } catch (err) {
    handleError(res, err);
  }
};