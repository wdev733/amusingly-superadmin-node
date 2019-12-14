const database = require('../../../services/mysql');

const getWidgetListByCustomerID = async (customerId) => {
  
  const query = "SELECT * FROM customer_embed_widget WHERE customer_id = " + customerId;

  const widgetList = await database.query(query);
  if (widgetList.length === 0) {
    return false;
  } else {
    return widgetList;
  }
};

const getWidgetById = async (widgetId) => {
  const query = 'SELECT * FROM customer_embed_widget WHERE embed_id = ' + widgetId;

  const widgetList = await database.query(query);
  if (widgetList.length === 0) {
    return false;
  } else {
    return widgetList[0];
  }
};

const deleteWidgetById = async (widgetId) => {
  
  const query = 'DELETE FROM customer_embed_widget WHERE embed_id = ' + widgetId;
  const ret = await database.query(query);
  return ret;
};

const addNewWidget = async (widget_name, customer_id, customer_insta_id, backcolor, txtcolor, popup, socialsharing, widget_type,
  widget_style, widget_fullpage, thumbnail, layout_row, layout_column, hover_effect, embed_padding, embed_width, widget_key) => {

    const query = 'Insert into customer_embed_widget (widget_name, customer_id, customer_insta_id, backcolor, txtcolor, popup, socialsharing,' +
      'widget_type, widget_style, widget_fullpage, thumbnail, layout_row, layout_column, hover_effect, embed_padding, embed_width, widget_key) value ' +
    '(' +
    "'" + widget_name + "', " +
    "'" + customer_id + "', " +
    "'" + customer_insta_id + "', " +
    "'" + backcolor + "', " +
    "'" + txtcolor + "', " +
    "'" + popup + "', " +
    "'" + socialsharing + "', " +
    "'" + widget_type + "', " +
    "'" + widget_style + "', " +
    "'" + widget_fullpage + "', " +
    "'" + thumbnail + "', " +
    "'" + layout_row + "', " +
    "'" + layout_column + "', " +
    "'" + hover_effect + "', " +
    "'" + embed_padding + "', " +
    "'" + embed_width + "', " +
    "'" + widget_key + "'" +
    ')';

  const ret = await database.query(query);
  return ret.insertId;
};

const updateWidget = async (embed_id, widget_name, backcolor, txtcolor, popup, socialsharing, widget_type,
  widget_style, widget_fullpage, thumbnail, layout_row, layout_column, hover_effect, embed_padding, embed_width) => {

  let query = 'UPDATE customer_embed_widget SET ' +
    "widget_name = '" + widget_name + "', " +
    "backcolor = '" + backcolor + "', " +
    "txtcolor = '" + txtcolor + "', " +
    "popup = '" + popup + "', " +
    "socialsharing = '" + socialsharing + "', " +
    "widget_type = '" + widget_type + "', " +
    "widget_style = '" + widget_style + "', " +
    "widget_fullpage = '" + widget_fullpage + "', " +
    "thumbnail = '" + thumbnail + "', " +
    "layout_row = '" + layout_row + "', " +
    "layout_column = '" + layout_column + "', " +
    "hover_effect = '" + hover_effect + "', " +
    "embed_padding = '" + embed_padding + "', " +
    "embed_width = '" + embed_width + "' " +
    "WHERE embed_id = '" + embed_id + "'";

    const ret = await database.query(query);

  return ret;
};

// Images For Embed Widget
const getImagesForWidget = async widgetId => {
  const query =
    "SELECT * FROM embed_widget_images WHERE widget_id = '" + widgetId + "'";

  const imageList = await database.query(query);
  if (imageList.length === 0) {
    return false;
  } else {
    return imageList;
  }
};

const insertImagesForWidget = async (widgetId, imageIdList) => {
  let query = 'INSERT INTO embed_widget_images (widget_id, image_id) value';
  if (imageIdList.length > 0) {
    for (let i = 0; i < imageIdList.length; i++) {
      if (i !== 0) {
        query += ',';
      }
      query += "('" + widgetId + "', '" + imageIdList[i] + "')";
    }
    const ret = await database.query(query);
    return ret;
  }
  return false;
};

const deleteImagesForWidget = async widgetId => {
  const query = "DELETE FROM embed_widget_images WHERE widget_id ='" + widgetId + "'";
  const ret = await database.query(query);
  return ret;
};

const Widget = {
  getWidgetListByCustomerID,
  getWidgetById,
  deleteWidgetById,
  addNewWidget,
  updateWidget,
  getImagesForWidget,
  insertImagesForWidget,
  deleteImagesForWidget
};

export default Widget;
