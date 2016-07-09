'use strict';

import mongoose from 'mongoose';

var EntrySchema = new mongoose.Schema({
  name: String,         // 词条名
  prompt: Array,        // 提示
  category: String,     // 类别
  active: Boolean       // 是否启用
});

export default mongoose.model('Entry', EntrySchema);
