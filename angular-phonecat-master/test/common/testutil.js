/**
 * Created by i851205 on 3/16/16.
 */
angular.module('util',[])
    .factory('utilLib',function(){
        return{
            addPanes:function(numberofpanes){
                var str = '';
                for(var j=0;j<numberofpanes;j++)
                {
                    str+= '<info-pane></info-pane>';
                }
                return str;
            }
        }

    })
