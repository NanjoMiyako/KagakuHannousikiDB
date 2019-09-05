const TAB_KAGAKU_HANNOU_SEARCH = "tab_KagakuHannousikiKensaku"
const TAB_KAGAKU_HANNOU_TUIKA = "tab_KagakuHanousikiTuika"
const TAB_KAGAKU_SIKI_TUIKA = "tab_KagakusikiTuika"
const TAB_KAGAKU_SIKI_SAKUJO = "tab_DeleteKagakusiki"
const TAB_DATA_I_O = "tab_DataImportExport"

var AllTabNameList = [
TAB_KAGAKU_HANNOU_SEARCH,
TAB_KAGAKU_HANNOU_TUIKA,
TAB_KAGAKU_SIKI_TUIKA,
TAB_KAGAKU_SIKI_SAKUJO,
TAB_DATA_I_O
];

//化学反応式のタイプ(分解・燃焼等)
var g_HannouType = [];
//化学式のリスト
var g_KagakusikiList = [];
var g_KagakusikiMaxId = 0;
//化学反応式のリスト
var g_KagakuHannousikiList = [];
var g_KagakuHannousikiMaxId = 0;
//インポート済みフラグ
var g_KagakusikiImportFlg =false;
var g_KagakuHannousikiImportFlg = false;

InitTab();


function InitTab(){
	HiddenAllTab();
	DisplayTab(TAB_DATA_I_O);
}

function ChangeTab(){
	HiddenAllTab();
	
	//選択されたタブを取得
	var form1 = document.getElementById("form1");
	var selectedTabIdx = form1.tabPages.selectedIndex;
	var selectedTabNm = form1.tabPages.options[selectedTabIdx].value;

	DisplayTab(selectedTabNm);
}

//指定したタブを表示
function DisplayTab(tabNm){

	//タブごとの各種表示用処理
	if(tabNm == TAB_KAGAKU_HANNOU_SEARCH){
		DisplayKagakuHannouSearchTab();
	}else if(tabNm == TAB_KAGAKU_HANNOU_TUIKA){
		DisplayKagakuHannouTuikaTab();
	}else if(tabNm == TAB_KAGAKU_SIKI_TUIKA){
		DisplayKagakusikiTuikaTab();
	}else if(tabNm == TAB_KAGAKU_SIKI_SAKUJO){
		DisplayKagakusikiSakujoTab()
	}else if(tabNm == TAB_DATA_I_O){
		DisplayDataImportExportTab();
	}

	var tabElem1 = document.getElementById(tabNm);
	tabElem1.style.display = 'block';

}
//すべてのタブを非表示にする
function HiddenAllTab(){
	var tabElem1;
	for(var i=0; i<AllTabNameList.length; i++){
		tabElem1 = document.getElementById(AllTabNameList[i]);
		tabElem1.style.display = 'none';
	}
	
}


function DisplayKagakuHannouSearchTab(){
	selboxElem = document.getElementById("HannouTypeOnKagakuHannousikiKensakuTab");
	//検索結果のセレクトボックスをクリア
	while(selboxElem.firstChild != null){ selboxElem.removeChild(selboxElem.firstChild); }
	for(var i=0; i<g_HannouType.length; i++){
		var opt = document.createElement("option");
		opt.text = g_HannouType[i];
		opt.value = g_HannouType[i];
		selboxElem.appendChild(opt);
	}
	
	

}

function DisplayKagakuHannouTuikaTab(){
}

function DisplayKagakusikiTuikaTab(){
}

function DisplayKagakusikiSakujoTab(){
}

function DisplayDataImportExportTab(){
	var spanElem;
	
	spanElem = document.getElementById("ImportKagakusikiFlgOnDataImportExportTab");
	if(g_KagakusikiImportFlg == true){
		spanElem.innerHTML = "化学式データ：インポート済み"
	}else{
		spanElem.innerHTML = "化学式データ：インポート未完了"
	}
	
	spanElem = document.getElementById("ImportKagakuHannousikiFlgOnDataImportExportTab");
	if(g_KagakuHannousikiImportFlg == true){
		spanElem.innerHTML = "化学反応式データ：インポート済み"
	}else{
		spanElem.innerHTML = "化学反応式データ：インポート未完了"
	}

}

function DisplaySearchResult(kagakuHannousikiList){
	var hrElem;
	var spanElem;
	var spanElem2;
	var subElem;
	var brElem;
	var btnElem;
	var divElem;
	var kagakusikiList;
	var keisuList;
	var hannouType;
	var gensoList;
	
	
	divElem = document.getElementById("searchResultOnKagakuHannousikiKensakuTab");
	//検索結果のDivをクリア
	while(divElem.firstChild != null){ divElem.removeChild(divElem.firstChild); }
	
	for(var i=0; i<kagakuHannousikiList.length; i++){
		hrElem = document.createElement("hr");
		divElem.appendChild(hrElem);
		
		kagakusikiList = kagakuHannousikiList[i].HannouButuList;
		keisuList = kagakuHannousikiList[i].HannouKeisuList;
		hannouType = kagakuHannousikiList[i].HannouType;
		for(var j=0; j<kagakusikiList.length; j++){
			if(j != 0){
				spanElem = document.createElement("span");
				spanElem.innerHTML = "　+　";
				divElem.appendChild(spanElem);
			}

			spanElem2 = document.createElement("span");
			spanElem2.innerHTML = keisuList[j];
			spanElem2.style.color = "red";
			divElem.appendChild(spanElem2);
			
			gensoList = kagakusikiList[j].split("_");
			for(var k=0; k<gensoList.length; k++){

				spanElem = document.createElement("span");
				spanElem.innerHTML = gensoList[k];
				divElem.appendChild(spanElem);
				
				if(gensoList[k+1] >= 2){
					subElem = document.createElement("sub");
					subElem.innerHTML = gensoList[k+1];
					divElem.appendChild(subElem);
				}
				k++;
				

			}
		}
		
		spanElem = document.createElement("span");
		spanElem.innerHTML = "　=　";
		divElem.appendChild(spanElem);
		
		kagakusikiList = kagakuHannousikiList[i].SeiseiButuList;
		keisuList = kagakuHannousikiList[i].SeiseiKeisuList;
		for(var j2=0; j2<kagakusikiList.length; j2++){
			if(j2 != 0){
				spanElem = document.createElement("span");
				spanElem.innerHTML = "　+　";
				divElem.appendChild(spanElem);
			}
				
			spanElem2 = document.createElement("span");
			spanElem2.innerHTML = keisuList[j2];
			spanElem2.style.color = "red";
			divElem.appendChild(spanElem2);
			
			gensoList = kagakusikiList[j2].split("_");
			for(var k2=0; k2<gensoList.length; k2++){

				spanElem = document.createElement("span");
				spanElem.innerHTML = gensoList[k2];
				divElem.appendChild(spanElem);
				
				if(gensoList[k2+1] >= 2){
					subElem = document.createElement("sub");
					subElem.innerHTML = gensoList[k2+1];
					divElem.appendChild(subElem);
				}
				k2++;

			}
		}
	
		
		brElem = document.createElement("br");
		divElem.appendChild(brElem);
		
		spanElem = document.createElement("span");
		spanElem.innerHTML = "反応タイプ:　"
		spanElem.innerHTML += hannouType;
		divElem.appendChild(spanElem);
		
		brElem = document.createElement("br");
		divElem.appendChild(brElem);
		
		
		spanElem  = document.createElement("span");
		spanElem.innerHTML = "*この化学反応式を";
		divElem.appendChild(spanElem);
		
		btnElem = document.createElement("button");
		btnElem.innerText = "削除";
		btnElem.value = kagakuHannousikiList[i].id;
		btnElem.onclick = function(){
			var id1 = parseInt(this.value);
			DeleteKagakuHannouSiki(id1);
			
			SearchOnKagakuHannousikiKensakuTab();
		}		
		divElem.appendChild(btnElem);
		
	}
}

function DeleteKagakuSiki(id1){
	var existFlg = false;
	for(var i=0; i<g_KagakusikiList.length; i++){
		if(id1 == g_KagakusikiList[i].id){
			existFlg = true;
			break;
		}
	}
	if(existFlg == true){
		g_KagakusikiList.splice(i,1);
		return id1;

	}

	return null;
}

function DeleteKagakuHannouSiki(id1){
	var existFlg = false;
	for(var i=0; i<g_KagakuHannousikiList.length; i++){
		if(id1 == g_KagakuHannousikiList[i].id){
			existFlg = true;
			break;
		}
	}
	
	if(existFlg == true){
		g_KagakuHannousikiList.splice(i,1);
		return id1;
	}
	
	return null;
}

function DeleteOnDeleteKagakusikiTab(){
	var mainName1 = document.getElementById("Kagakusiki_OnDeleteKagakusikiTab").value;
	mainName1 = GetMainName(mainName1);
	if(mainName1 == null){
		alert("削除対象の化学式が見つかりませんでした");
		return;
	}
		
	var id1 = null;
	var str1;
	for(var i=0; i<g_KagakusikiList.length; i++){
		if(g_KagakusikiList[i].mainName == mainName1){
			id1 = g_KagakusikiList[i].id;
			break;
		}
	}
	if(id1 == null){
		alert("削除対象の化学式が見つかりませんでした");
		return;
	}else{
		DeleteKagakuSiki(id1);
		str1 = "化学式:";
		str1 += mainName1;
		str1 += "を削除しました";
		alert(str1);
	}

}

function SearchOnKagakuHannousikiKensakuTab(){
	var HannouFlg;
	var SeiseiFlg;
	var HannouType;
	var searchedList;
	
	
	var formElem = document.getElementById("SearchForm");
	var radioNodeList = formElem.Hannou_Seisei;
	var value = radioNodeList.value;
	
	if(value == "0"){
		HannouFlg = true;
		SeiseiFlg = false;
	}else if(value == "1"){
		HannouFlg = false;
		SeiseiFlg = true;
	}else if(value == "2"){
		HannouFlg = true;
		SeiseiFlg = true;
	}
	
	var  mainName = document.getElementById("KagakusikiOnKagakuHannousikiKensakuTab").value
	mainName = GetMainName(mainName);
	if(mainName == null){
		alert("化学式リストの検索に失敗しました");
	}

	var  selBox = document.getElementById("HannouTypeOnKagakuHannousikiKensakuTab");
	var selBoxVal = selBox[selBox.selectedIndex].value;
	if(selBoxVal == "All"){
		HannouType = "-";
	}else{
		HannouType = selBoxVal;
	}
	
	searchedList = SearchHannousiki(mainName, HannouFlg, SeiseiFlg, HannouType);
	DisplaySearchResult(searchedList);

}

function RegistOnKagakuHanousikiTuikaTab(){
	var HannouButuList = [];
	var SeiseiButuList = [];
	var HannouKeisuList = [];
	var SeiseiKeisuList = [];
	var HannouType = [];
	
	var val1;
	var val2;
	
	//反応物
	val1 = document.getElementById("Hannou_Butu1_OnKagakuHanousikiTuikaTab").value;
	if(val1 != ""){
		val2 = parseInt(document.getElementById("Hannou_Keisu1_OnKagakuHanousikiTuikaTab").value)
		HannouButuList.push(val1);
		HannouKeisuList.push(val2);
	}
	
	val1 = document.getElementById("Hannou_Butu2_OnKagakuHanousikiTuikaTab").value;
	if(val1 != ""){
		val2 = parseInt(document.getElementById("Hannou_Keisu2_OnKagakuHanousikiTuikaTab").value)
		HannouButuList.push(val1);
		HannouKeisuList.push(val2);
	}
	
	val1 = document.getElementById("Hannou_Butu3_OnKagakuHanousikiTuikaTab").value;
	if(val1 != ""){
		val2 = parseInt(document.getElementById("Hannou_Keisu3_OnKagakuHanousikiTuikaTab").value)
		HannouButuList.push(val1);
		HannouKeisuList.push(val2);
	}
	
	val1 = document.getElementById("Hannou_Butu4_OnKagakuHanousikiTuikaTab").value;
	if(val1 != ""){
		val2 = parseInt(document.getElementById("Hannou_Keisu4_OnKagakuHanousikiTuikaTab").value)
		HannouButuList.push(val1);
		HannouKeisuList.push(val2);
	}
	
	val1 = document.getElementById("Hannou_Butu5_OnKagakuHanousikiTuikaTab").value;
	if(val1 != ""){
		val2 = parseInt(document.getElementById("Hannou_Keisu5_OnKagakuHanousikiTuikaTab").value)
		HannouButuList.push(val1);
		HannouKeisuList.push(val2);
	}
	
	
	//生成物
	val1 = document.getElementById("Seisei_Butu1_OnKagakuHanousikiTuikaTab").value;
	if(val1 != ""){
		val2 = parseInt(document.getElementById("Seisei_Keisu1_OnKagakuHanousikiTuikaTab").value)
		SeiseiButuList.push(val1);
		SeiseiKeisuList.push(val2);
	}
	
	val1 = document.getElementById("Seisei_Butu2_OnKagakuHanousikiTuikaTab").value;
	if(val1 != ""){
		val2 = parseInt(document.getElementById("Seisei_Keisu2_OnKagakuHanousikiTuikaTab").value)
		SeiseiButuList.push(val1);
		SeiseiKeisuList.push(val2);
	}
	
	val1 = document.getElementById("Seisei_Butu3_OnKagakuHanousikiTuikaTab").value;
	if(val1 != ""){
		val2 = parseInt(document.getElementById("Seisei_Keisu3_OnKagakuHanousikiTuikaTab").value)
		SeiseiButuList.push(val1);
		SeiseiKeisuList.push(val2);
	}
	
	val1 = document.getElementById("Seisei_Butu4_OnKagakuHanousikiTuikaTab").value;
	if(val1 != ""){
		val2 = parseInt(document.getElementById("Seisei_Keisu4_OnKagakuHanousikiTuikaTab").value)
		SeiseiButuList.push(val1);
		SeiseiKeisuList.push(val2);
	}
	
	val1 = document.getElementById("Seisei_Butu5_OnKagakuHanousikiTuikaTab").value;
	if(val1 != ""){
		val2 = parseInt(document.getElementById("Seisei_Keisu5_OnKagakuHanousikiTuikaTab").value)
		SeiseiButuList.push(val1);
		SeiseiKeisuList.push(val2);
	}
	
	//反応タイプ
	val1 = document.getElementById("Hannou_Type_OnKagakuHanousikiTuikaTab").value;
	if(val1 == ""){
		val1 = "-";
	}
	AddHannouType(val1);
	HannouType = val1;
	
	RegistKagakuHannousiki(HannouButuList, SeiseiButuList,
 HannouKeisuList, SeiseiKeisuList, HannouType);

}

//反応タイプが新しいものの場合、反応タイプリストに追加する
function AddHannouType(hannouType){
	var newFlg = true;
	for(var i=0; i<g_HannouType.length; i++){
		if(g_HannouType[i] == hannouType){
			newFlg = false;
			break;
		}
	}
	
	if(newFlg == true){
		g_HannouType.push(hannouType);
	}
}

function RegistOnKagakusikiTuikaTab(){
	var mainName;
	var aliasList = [];
	
	mainName = document.getElementById("Kagakusiki_OnKagakusikiTuikaTab").value;
	
	val1 = document.getElementById("Alias1_OnKagakusikiTuikaTab").value;
	if(val1 != ""){
		aliasList.push(val1)
	}
	
	val1 = document.getElementById("Alias2_OnKagakusikiTuikaTab").value;
	if(val1 != ""){
		aliasList.push(val1)
	}
	
	val1 = document.getElementById("Alias3_OnKagakusikiTuikaTab").value;
	if(val1 != ""){
		aliasList.push(val1)
	}
	
	val1 = document.getElementById("Alias4_OnKagakusikiTuikaTab").value;
	if(val1 != ""){
		aliasList.push(val1)
	}
	
	val1 = document.getElementById("Alias5_OnKagakusikiTuikaTab").value;
	if(val1 != ""){
		aliasList.push(val1)
	}
	
	RegistKagakusiki(mainName, aliasList);
	
	
}

function  GetMainName(name1){
	var retName;
	var aliasList;
	
	for(var i=0; i<g_KagakusikiList.length; i++){
		aliasList = g_KagakusikiList[i].aliasList;
		for(var j=0; j<aliasList.length; j++){
			if(aliasList[j] == name1){
				retName = g_KagakusikiList[i].mainName;
				return retName;
			}
		}
		if(g_KagakusikiList[i].mainName == name1){
			retName = name1;
			return retName;
		}
	}
	return null;
}

function SearchHannousiki(mainName, HannouFlg, SeiseiFlg, HannouType){
	var resultList = [];
	var hannouButu;
	var seiseiButu;
	var hannousiki;
	
loop1: for(var i=0; i<g_KagakuHannousikiList.length; i++){
		hannousiki = g_KagakuHannousikiList[i];
		
		//反応物から検索
		if(HannouFlg == true){
		for(var j=0; j<hannousiki.HannouButuList.length; j++){
				hannouButu = hannousiki.HannouButuList[j];
				if( HannouType != "-" &&
					hannousiki.HannouType != HannouType){
					continue loop1;
				} 
				if(mainName == hannouButu){
					resultList.push(hannousiki);
					continue loop1;
				}
			}
		}
		
		//生成物から検索
		if(SeiseiFlg == true){
			for(var j=0; j<hannousiki.SeiseiButuList.length; j++){
				seiseiButu = hannousiki.SeiseiButuList[j];
				if( HannouType != "-" &&
					hannousiki.HannouType != HannouType){
					continue loop1;
				} 
				if(mainName == seiseiButu){
					resultList.push(hannousiki);
					continue loop1;
				}
			}
		}
		
	}
	
	return resultList;
}



function RegistKagakusiki(mainName, aliasList){
	var id1;
	
	//既に登録されている場合は削除してから再登録
	if(GetMainName(mainName) != null){
		for(var i=0; i<g_KagakusikiList.length; i++){
			if(mainName == g_KagakusikiList.mainName){
				id1 = g_KagakusikiList.id;
				break;
			}
		}
		DeleteKagakuSiki(id1);
	}
	
	var newKagakusiki;
	newKagakusiki = new Kagakusiki(mainName, aliasList);
	g_KagakusikiList.push(newKagakusiki);
	
	alert("化学式を登録しました");
}

function RegistKagakuHannousiki(HannouButuList, SeiseiButuList,
 HannouKeisuList, SeiseiKeisuList, HannouType){
	var RegistHannouButuList = [];
	var RegistSeiseiButuList = [];
	var newKagakuHannousiki;
	
	var value;
	for(var i=0; i<HannouButuList.length; i++){
		value = GetMainName(HannouButuList[i]);
		if(value == null){
			alert("反応物が化学式リスト中にありませんでした、登録に失敗しました");
			return null;
		}
		RegistHannouButuList.push(value);
	}
	for(var j=0; j<SeiseiButuList.length; j++){
		value = GetMainName(SeiseiButuList[j]);
		if(value == null){
			alert("生成物が化学式リスト中にありませんでした、登録に失敗しました");
			return null;
		}
		RegistSeiseiButuList.push(value);
	}
	
	newKagakuHannousiki = new KagakuHannousiki(RegistHannouButuList, 
	RegistSeiseiButuList, HannouKeisuList, SeiseiKeisuList, HannouType);
	g_KagakuHannousikiList.push(newKagakuHannousiki);
	
	alert("化学反応式を登録しました");
}


function ImportHannouSikiOnDataImportExportTab(){
      var fileRef = document.getElementById('fileOnDataImportExportTab');
	  var content;
	  
      if (1 <= fileRef.files.length) {
        var reader = new FileReader();
			//ファイル読み出し完了後の処理を記述
			reader.onload = function (theFile) {
			var content = theFile.target.result;
			g_KagakuHannousikiList = JSON.parse(content);
			g_KagakuHannousikiImportFlg = true;
			DisplayDataImportExportTab();
			
			for(var i=0; i<g_KagakuHannousikiList.length; i++){
				AddHannouType(g_KagakuHannousikiList[i].HannouType);
			}
			
        }

		//ファイル読み出し
        reader.readAsText(fileRef.files[0], "utf-8");

      }
}

function ImportKagakuSikiOnDataImportExportTab(){
      var fileRef = document.getElementById('fileOnDataImportExportTab');
	  var content;
	  
      if (1 <= fileRef.files.length) {
			var reader = new FileReader();
			//ファイル読み出し完了後の処理を記述
			reader.onload = function (theFile) {
			var content = theFile.target.result;
			g_KagakusikiList = JSON.parse(content);
			g_KagakusikiImportFlg = true;
			DisplayDataImportExportTab();
        }

		//ファイル読み出し
        reader.readAsText(fileRef.files[0], "utf-8");

      }

}

function DownloadKagakusikiData(){
          //ファイルを作ってダウンロードします。
          var resultJson = JSON.stringify(g_KagakusikiList);
          var downLoadLink = document.createElement("a");
          downLoadLink.download = "Kagakusiki.json";
          downLoadLink.href = URL.createObjectURL(new Blob([resultJson], {type: "text.plain;charset=utf-8;"}));
          downLoadLink.dataset.downloadurl = ["text/plain", downLoadLink.download, downLoadLink.href].join(":");
          downLoadLink.click();
}

function DownloadKagakuHannousikiData(){
          //ファイルを作ってダウンロードします。
          var resultJson = JSON.stringify(g_KagakuHannousikiList);
          var downLoadLink = document.createElement("a");
          downLoadLink.download = "KagakuHannousiki.json";
          downLoadLink.href = URL.createObjectURL(new Blob([resultJson], {type: "text.plain;charset=utf-8;"}));
          downLoadLink.dataset.downloadurl = ["text/plain", downLoadLink.download, downLoadLink.href].join(":");
          downLoadLink.click();
}


var g_reader = new FileReader();
var g_File;
var fileElem = document.getElementById("fileOnDataImportExportTab");
fileElem.onchange = function(event) {
    g_File = event.target.files[0];
};


//テスト用
function Test1(){
	
	var kagakusiki;
	var mainName;
	var aliasList;

	mainName = "H_2";
	aliasList = ["水素"]
	kagakusiki = new Kagakusiki(mainName, aliasList);	
	g_KagakusikiList.push(kagakusiki);
	
	mainName = "O_2";
	aliasList = ["酸素"]
	kagakusiki = new Kagakusiki(mainName, aliasList);	
	g_KagakusikiList.push(kagakusiki);
	
	
	mainName = "H_2_O_1";
	aliasList = ["H_2_O", "水"]
	kagakusiki = new Kagakusiki(mainName, aliasList);	
	g_KagakusikiList.push(kagakusiki);
	
	var kagakuHannousiki;
	var HannouButuList = ["H_2", "O_2"]
	var SeiseiButuList = ["H_2_O_1"];
	var HannouKeisuList = [2, 1];
	var SeiseiKeisuList = [2];
	var HannouType = "燃焼";
	
	kagakuHannousiki = new KagakuHannousiki(HannouButuList, 
	SeiseiButuList, HannouKeisuList, SeiseiKeisuList, HannouType);
	g_KagakuHannousikiList.push(kagakuHannousiki);
	
	
}
//化学式のコンストラクタ
function Kagakusiki(mainName, aliasList){
	g_KagakusikiMaxId++;
	this.id = g_KagakusikiMaxId;
	this.mainName = mainName;
	this.aliasList = aliasList;
}
//化学反応式のコンストラクタ
function KagakuHannousiki(HannouButuList, SeiseiButuList, 
HannouKeisuList, SeiseiKeisuList, HannouType){
	g_KagakuHannousikiMaxId++;
	this.id = g_KagakuHannousikiMaxId;
	this.HannouButuList = HannouButuList;
	this.SeiseiButuList = SeiseiButuList;
	this.HannouKeisuList = HannouKeisuList;
	this.SeiseiKeisuList = SeiseiKeisuList;
	this.HannouType = HannouType;
	
	AddHannouType(HannouType);
}
