"use strict";

document.observe("dom:loaded", function() {
	 /* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */
	var all_img = $$("#labs img");
	for(var i=0; i<all_img.length; i++) {new Draggable(all_img[i], {revert: true});}
	Droppables.add("selectpad", {onDrop: labSelect});
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */
	var all_sel = $$("#selectpad img");
	/* 아이디 selectpad에 있는 img가 3개 미만일 경우와 drop된 그림의 visibility 스타일이 hidden이 아닐 때에만 그림이 들어감:
	 그렇지 않으면 그림이 Laboratory Selection에 계속 들어가거나 Your Lab Selections에 계속 리스트가 추가됨 */
	if((all_sel.length < 3) && (drop.getStyle("visibility") != "hidden")){
		/* 그림이 #selectpad에 추가될 경우와 리스트 목록에 들어가는 부분 구현 */
		var selpad = document.getElementById("selectpad");
		selpad.appendChild(drag);
		var order_list = document.getElementById("selection");
		var sel_list = document.createElement("li");
		var drag_alt = document.createTextNode(drag.alt); 

		sel_list.appendChild(drag_alt);
		order_list.appendChild(sel_list);

		setTimeout(function(){
			sel_list.pulsate({
				duration: 1.0,
				pulses: 5
			});
		},500);

		/* 그림이 #selectpad에서 빠질 경우 구현 */
		new Draggable(drag, {revert: true});
		Droppables.add("labs", {onDrop: function(drag, drop, event){
			var add_labs = document.getElementById("labs");
			add_labs.appendChild(drag);
			var rmv_sel_pa = document.getElementById("selection");
			var rmv_sel_ch = document.getElementById("selection").childNodes;
			for(var i=0; i<rmv_sel_ch.length; i++) {if(rmv_sel_ch[i].textContent == drag.alt) {rmv_sel_pa.removeChild(rmv_sel_ch[i]);}}
		}});
	}
}