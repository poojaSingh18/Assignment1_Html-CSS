	var fs= require("fs");
	var array_main;
	var i=0;
	var j=0;
	/*var heading="Age-group,literate_population";*/
	var row;
	var fileName=["records/India2011.csv","records/IndiaSC2011.csv","records/IndiaST2011.csv"];
    var main_row;
	var eachrow;
	var line;
	var flag=0;

//Part 1---------Age-wise population distribution of literate people
//converting to json
var result=[];
//result=result1();
var jsonObj = JSON.stringify(result);

//writing json to file
/*fs.writeFile('json/converted1.json', jsonObj,  function(err) {
   if (err) {
       return console.error(err);
   }
});*/

//csv method
function result1(){

   var result=[];
	var statecode;
	var tru;
	var agegroup;
	var literate;

for(;i<fileName.length; i++){
	

	var data= fs.readFileSync(fileName[i], 'utf8');

	array_main=data.toString().split("\n");//to split each line
	        
	         main_row=array_main[0].split(",");//to split each line seperated by comma
	         
	         j=0;
	        

	         //for finding index of age-group and Illiterate-Persons
			for(; j<main_row.length; j=j+1){
				
				if(main_row[j]=='State Code'){
	               
					statecode=j
				}
				else if(main_row[j]=='Total/ Rural/ Urban'){

					tru=j;

				}
				else if(main_row[j]=='Age-group'){
		      	     
		      	     agegroup=j;
		      }
		      else if(main_row[j]=='Literate - Persons'){
		      	literate=j;

		      }

			}

			//finding age-groups
	          
	         var w=0;
	     
	       
	        for(j=1;j<array_main.length;j++){
	        	 
	        	 eachrow=array_main[j].split(',');
	        	
	        	 var obj={};
		        	if(flag==0)
		        	{ 
		        		
		        		
		        		if((eachrow[statecode]=="01") && (eachrow[tru]=="Total")){
		        	
		                 obj.age=eachrow[agegroup];
		                 obj.literate_population =eachrow[literate]; 
                         result.push(obj);
		                 w++;             
		        		}
		        		else
		        		{ 
		        			flag=1; 
		        			w=0;
		        		}

		        	} 
			        else{
	 
			        		    if(eachrow[tru]=="Total")
			        		    {
			                      result[w].literate_population=parseInt(result[w].literate_population)+parseInt(eachrow[literate]);
			                      w++; 
			                 
			                    } 
			                 else{
			                 	w=0;
			                     }
			              

			        	    }
				
			     }
	    

}//end of for

	     return result;

}



//Part 1-b--------State-wise Graduate Population
//conversion to json

var result=[]
//result=result2a();

var jsonObj = JSON.stringify(result);

//writing json to file
/*fs.writeFile('json/converted2a.json', jsonObj,  function(err) {
   if (err) {
       return console.error(err);
   }
});*/

//csv computation method
function result2a(){


    var result=[];
    var statecode;
	var areaname;
	var tru;
	var agegroup;
	var graduate;

for(;i<fileName.length; i++){
	

	var data= fs.readFileSync(fileName[i], 'utf8');

	array_main=data.toString().split("\n");
	        
	         main_row=array_main[0].split(",");//to split each line seperated by comma
	         j=0;
	         //for finding index of age-group and Illiterate-Persons
			for(; j<main_row.length; j=j+1){
				
				if(main_row[j]=='State Code'){
	               
					statecode=j;

				}
				else if(main_row[j]=='Area Name'){
					areaname=j;

				}
				else if(main_row[j]=='Total/ Rural/ Urban'){

					tru=j;   

				}
				else if(main_row[j]=='Age-group'){
		      	     
		      	     agegroup=j;
		      	    
		      }
		      else if(main_row[j]=='Educational level - Graduate & above - Persons'){
		      	     graduate=j;


		      }

			}

			//finding age-groups
	          
	         var w=0;
	     
	       
	        for(j=1;j<array_main.length;j++){
	        	 
	        	 eachrow=array_main[j].split(',');
	        	var obj={};
	        	 
	        	if(i==0)
	        	{ 
	        		
	        		if((eachrow[tru]=="Total") && (eachrow[agegroup]=="All ages")){
	        		
	                  
	                 obj.areaname=eachrow[areaname];
	                 obj.graduate_population =eachrow[graduate]; 
                     result.push(obj);
	                 w++;             
	        		}


	        	} 
		        else{ 
		        	
		        		    if((eachrow[tru]=="Total") && (eachrow[agegroup]=="All ages"))
		        		    {
		                       result[w].graduate_population=parseInt(result[w].graduate_population)+parseInt(eachrow[graduate]); 
		                      w++; 
		                 
		                    } 
		          

		        	    }
			
		     }
	    

}//end of for

	     return result;

}


//Part 1-b--------gender-wise Graduate Population
//conversion to json

var result=[];
//result=result2b();

var jsonObj = JSON.stringify(result);

//writing json to file
/*fs.writeFile('json/converted2b.json', jsonObj,  function(err) {
   if (err) {
       return console.error(err);
   }
});*/

function result2b(){
    
    var result=[];
    var tru;
	var agegroup;
	var malegd;
	var femalegd;
    var objm={};
    objm.gender="male";
    var objf={};
    objf.gender="female";
    objm.literate=0;
    objf.literate=0;
     
for(;i<fileName.length; i++){
	

	var data= fs.readFileSync(fileName[i], 'utf8');

	array_main=data.toString().split("\n");
	        
	         main_row=array_main[0].split(",");//to split each line seperated by comma
	         
	         j=0;
	     

	         //for finding index of age-group and Illiterate-Persons
			for(; j<main_row.length; j=j+1){
		
				if(main_row[j]=='Total/ Rural/ Urban'){

					tru=j;   

				}
				else if(main_row[j]=='Age-group'){
		      	     
		      	     agegroup=j;
		      	    
		      }
		      else if(main_row[j]=='Educational level - Graduate & above - Males'){
		      	     malegd=j;


		      }
		      else if(main_row[j]=='Educational level - Graduate & above - Females'){
		      	femalegd=j;
		      }

			}

			//finding age-groups
	          
	         var w=0;
	     
	       
	        for(j=1;j<array_main.length;j++){
	        	 
	        	 eachrow=array_main[j].split(',');
	        
	        		if((eachrow[tru]=="Total") && (eachrow[agegroup]=="All ages")){
	        		
	                  
	                objm.literate=parseInt(objm.literate)+parseInt(eachrow[malegd]);
	                objf.literate=parseInt(objf.literate)+parseInt(eachrow[femalegd]); 

	                             
	        		}

	        	} 

}//end of for
 
         result.push(objm);
         result.push(objf);
	     return result;

}



//Part 3------------Education Category-wise

var result=[]
result=result3();

/*for(var q=0;q<result.length;q++){
	console.log(q);
console.log(result[q]);
}*/
var jsonObj = JSON.stringify(result);


//writing json to file
fs.writeFile('json/converted3.json', jsonObj,  function(err) {
   if (err) {
       return console.error(err);
   }
});
	

function result3(){

    var tru;
	var agegroup;
    var el_withoutel;
    var el_belowpri;
    var el_primary;
    var el_middle;
    var el_metric;
    var el_higher;
    var el_nt_diploma;
    var el_t_diploma;
    var el_graduate;
    var el_unclassified;
   
    var result=[];





for(;i<fileName.length; i++){

	var objmain={};
	
	console.log("Education level for "+fileName[i]);

	var data= fs.readFileSync(fileName[i], 'utf8');

	array_main=data.toString().split("\n");
	        
	         main_row=array_main[0].split(",");//to split each line seperated by comma
	         
	         j=0;
	     

	         //for finding index of age-group and Illiterate-Persons
			for(; j<main_row.length; j=j+1){
		
				if(main_row[j]=='Total/ Rural/ Urban'){

					tru=j;   

				}
				else if(main_row[j]=='Age-group'){
		      	     
		      	     agegroup=j;
		      	    
		      }
		      else if(main_row[j]=='Educational level - Literate without educational level - Persons'){
		      	     
		      	     el_withoutel=j;

		      }
		      else if(main_row[j]=='Educational level - Below Primary - Persons'){
		      	el_belowpri=j;
		      }
		      else if(main_row[j]=='Educational level - Primary - Persons'){
              el_primary=j;
		      }
		      else if(main_row[j]=='Educational level - Middle - Persons'){
		      	el_middle=j;
		      }
		      else if(main_row[j]=='Educational level - Matric/Secondary - Persons'){
		      	el_metric=j;
		      }
		      else if(main_row[j]=='Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons'){
		      	el_higher=j;
		      }
		      else if(main_row[j]=='Educational level - Non-technical diploma or certificate not equal to degree - Persons'){
		      	el_nt_diploma=j;
		      }
            else if(main_row[j]=='Educational level - Technical diploma or certificate not equal to degree - Persons'){
		      	el_t_diploma=j;
		      }
		      
		      else if(main_row[j]=='Educational level - Graduate & above - Persons'){
		      	el_graduate=j;
		      }
		      else if(main_row[j]=='Educational level - Unclassified - Persons'){
		      	el_unclassified=j;
		      }

			}

			//finding eduaction levels
	          
	         var earray=[];
	         var flag=0;
	     
	       
	        for(j=1;j<array_main.length;j++){
          
	        
                var w=0;
	        	var obj={}; 
	        	 eachrow=array_main[j].split(',');
	        	
	        		if((eachrow[tru]=="Total") && (eachrow[agegroup]=="All ages")&& flag==0){
	        		 obj.edu="Educational level - Literate without educational level - Persons";
	        		 obj.population=eachrow[el_withoutel];
	                earray.push(obj);

                     obj=new Object();
	                 obj.edu="Educational level - Below Primary - Persons";
	                 obj.population=eachrow[el_belowpri];
	                 earray.push(obj);
	                 
                 
                     obj=new Object();
                     obj.edu="Educational level - Primary - Persons";
                     obj.population=eachrow[el_primary];
	                 
                     earray.push(obj);
                   
                    
                    obj=new Object();
                     obj.edu="Educational level - Middle - Persons";
                     obj.population=eachrow[el_middle];
	                 
	                 earray.push(obj);
	              
                   
                   obj=new Object();
                     obj.edu="Educational level - Matric/Secondary - Persons";
                     obj.population=(eachrow[el_metric]);
	           
	                 earray.push(obj);
                   
                   obj=new Object();
                     obj.edu="Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons";
                     obj.population=(eachrow[el_higher]);
	                 
	                 earray.push(obj);
	                 
                  obj=new Object();
                     obj.edu="Educational level - Non-technical diploma or certificate not equal to degree - Persons";
                     obj.population=(eachrow[el_nt_diploma]);
	                 
	                 earray.push(obj);
	 
                   obj=new Object();
                     obj.edu="Educational level - Technical diploma or certificate not equal to degree - Persons";
                     obj.population=(eachrow[el_t_diploma]);
	               
	                 earray.push(obj);
	                 
                    obj=new Object();
                     obj.edu="Educational level - Graduate & above - Persons";
                     obj.population=(eachrow[el_graduate]);
	                 
	                 earray.push(obj);
	                
                       obj=new Object();
                     obj.edu="Educational level - Unclassified - Persons";
                     obj.population=(eachrow[el_unclassified]);
                     earray.push(obj);
	                
	               flag=1;
                    
	                             
	        		}
	        		else if((eachrow[tru]=="Total") && (eachrow[agegroup]=="All ages")){
                       earray[w].population=parseInt(earray[w].population)+parseInt(eachrow[el_withoutel]); w++;
                       earray[w].population=parseInt(earray[w].population)+parseInt(eachrow[el_belowpri]); w++;
                      earray[w].population=parseInt(earray[w].population)+parseInt(eachrow[el_primary]); w++;
                      earray[w].population=parseInt(earray[w].population)+parseInt(eachrow[el_middle]); w++;
                       earray[w].population=parseInt(earray[w].population)+parseInt(eachrow[el_metric]); w++;
                     earray[w].population=parseInt(earray[w].population)+parseInt(eachrow[el_higher]); w++;
                     earray[w].population=parseInt(earray[w].population)+parseInt(eachrow[el_nt_diploma]); w++;
                      earray[w].population=parseInt(earray[w].population)+parseInt(eachrow[el_t_diploma]); w++;
                      earray[w].population=parseInt(earray[w].population)+parseInt(eachrow[el_graduate]); w++;
                      earray[w].population=parseInt(earray[w].population)+parseInt(eachrow[el_unclassified]); 
                      

	        		}



	        	}
	        
		  //returning education levels for each category
		   

          
                if(i==0){
               objmain.category="General";
           }
           else if(i==1){
               objmain.category="SC";
           }
           else{
               objmain.category="ST";
           }

           objmain.education=earray;
	     

	        	/*obj.Educational_evel_Literate_without_educational_level_Persons=sel_withoutel;
	        	obj.Educational_level_Below_Primary_Persons=sel_belowpri;
	        	obj.Educational_level_Primary_Persons=sel_primary;
	        	obj.Educational_level_Middle_Persons=sel_middle;
	        	obj.Educational_level_Matric_Secondary_Persons=sel_metric;
	        	obj.Educational_level_Higher_secondary_Intermediate_Pre_University_Senior_secondary_Persons=sel_higher;
	        	obj.Educational_level_Non_technical_diploma_or_certificate_not_equal_to_degree_Persons=sel_nt_diploma;
	        	obj.Educational_level_Technical_diploma_or_certificate_not_equal_to_degree_Persons=sel_t_diploma;
	        	obj.Educational_level_Graduate_and_above_Persons=sel_graduate;
	        	obj.Educational_level_Unclassified_Persons=sel_unclassified;
*/
              

           


           result.push(objmain);
	        	


		      	    

}//end of for



return result;

}

	     