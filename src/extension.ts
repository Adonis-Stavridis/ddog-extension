import * as vscode from 'vscode';
import axios from 'axios';

const API_TOKEN = 'c93h21aad3icjtmbvd70';
const SYMBOL = 'DDOG';
const TIMEOUT_TIME = 120; // 2 minutes

const UP_COLOR = 'mediumseagreen';
const DOWN_COLOR = 'tomato';

type ResponseData = {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
};

const displayDDOG = (item: vscode.StatusBarItem, data: ResponseData) => {
  const current = data.c;
  const change = data.d;
  const positive = change >= 0;

  item.text = `\$${SYMBOL}: ${current} |${
    positive ? '$(arrow-small-up)' : '$(arrow-small-down)'
  }${Math.abs(change).toFixed(2)}`;

  item.color = positive ? UP_COLOR : DOWN_COLOR;

  item.show();
};

const getDDOG = (item: vscode.StatusBarItem) => {
  axios
    .get('https://finnhub.io/api/v1/quote', {
      params: {
        symbol: SYMBOL,
        token: API_TOKEN
      }
    })
    .then(response => {
      console.log(response);
      displayDDOG(item, response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const activate = () => {
  const ddogItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  ddogItem.tooltip = `🚀 To the moon! 💎🙌`;

  getDDOG(ddogItem);
  setInterval(() => getDDOG(ddogItem), TIMEOUT_TIME * 1000);
};
