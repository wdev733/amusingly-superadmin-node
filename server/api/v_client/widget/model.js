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
  
  const query = "SELECT * FROM customer_embed_widget WHERE embed_id = " + widgetId;

  const widgetList = await database.query(query);
  if (widgetList.length === 0) {
    return false;
  } else {
    return widgetList[0];
  }
};

const deleteWidgetById = async (widgetId) => {
  
  const query = "DELETE FROM customer_embed_widget WHERE embed_id = " + widgetId;
  const ret = await database.query(query);
  return ret;
};

const addNewWidget = async (customer_id, customer_insta_id, backcolor, txtcolor, popup, socialsharing, widget_type,
  widget_style, widget_fullpage, thumbnail, layout_row, layout_column, hover_effect, embed_padding, embed_width) => {

    const query = 'Insert into customer_embed_widget (customer_id, customer_insta_id, backcolor, txtcolor, popup, socialsharing,' +
      'widget_type, widget_style, widget_fullpage, thumbnail, layout_row, layout_column, hover_effect, embed_padding, embed_width) value ' +
    '(' +
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
    "'" + embed_width + "'" +
    ')';

  const ret = await database.query(query);
  return ret;
    
};

const updateWidget = async (embed_id, backcolor, txtcolor, popup, socialsharing, widget_type,
  widget_style, widget_fullpage, thumbnail, layout_row, layout_column, hover_effect, embed_padding, embed_width) => {

  let query = 'UPDATE customer_embed_widget SET ' +
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

  console.log(query);

  const ret = await database.query(query);
  return ret;
};

const Widget = {
  getWidgetListByCustomerID,
  getWidgetById,
  deleteWidgetById,
  addNewWidget,
  updateWidget
};

export default Widget;
