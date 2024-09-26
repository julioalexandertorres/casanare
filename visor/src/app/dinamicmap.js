function dinamicmap(datastat) {
	//console.log(datastat.userOptions);
	//console.log(datastat.userOptions.data);
	var data1 = globalstyle;
	if (data1 === "Tipo Construccion") {	
		if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
			  if (datastat === "NPH") {            
				   var filtro = '"ph_calc=' + 0 + '"';   
				   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
			  } 	
			  else if (datastat === "PH") {          
				   var filtro = '"ph_calc=' + 1 + '"';   
				   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});    
			  } 

			  else{
				  var filtro = '"ph_calc<>' + 3 + '"';   
				  predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
			  }        
         }
		
	     else {
				var valor = "'" + values + "'";
				if (document.getElementById("barrio").value !== '') {
				if (datastat === "NPH") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'ph_calc=' + 0 + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "PH") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'ph_calc=' + 1 + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 	
				else{
				var filtro = '"cod_barrio=' + valor + '"'; 
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
				}				
		       }
				
			    else if (document.getElementById("manzana").value !== '') { 
				if (datastat === "NPH") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'ph_calc=' + 0 + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "PH") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'ph_calc=' + 1 + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 	
				else{
				var filtro = '"manzana_co=' + valor + '"'; 
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
				}				
		       }		     
            } 
         } 
	
	
		else if (data1 === "Uso_oficial_vs_AAA") {
            if (document.getElementById("Uso_oficial_vs_AAA").value === "Acueducto") {
			if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
				if (datastat === "Uso Coincidente") {            
					   var filtro = '"dif_uso_acued=' + "'"+'Igual'+ "'" + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
				  } 	
				  else if (datastat === "P.Comercial-D.Residencial") {          
					   var filtro = '"dif_uso_acued=' + "'"+'PCDR'+ "'" + '"';     
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  } 
				  else if (datastat === "P.Residencial-D.Comercial") {          
					   var filtro = '"dif_uso_acued=' + "'"+'PRDC'+ "'" + '"';     
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "Sin Informacion") {          
					   var filtro = '"dif_uso_acued=' + "'"+'Sin Informacion'+ "'" + '"';     
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else{
					  var filtro = '"dif_uso_acued<>' + "'"+'ninguno'+ "'" + '"';  
					  predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
				  }  
			
           } 
           else {
				var valor = "'" + values + "'";
				if (document.getElementById("barrio").value !== '') {
				if (datastat === "Uso Coincidente") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_acued=' + "'"+'Igual'+ "'" + '"';
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Comercial-D.Residencial") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_acued=' + "'"+'PCDR'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Residencial-D.Comercial") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_acued=' + "'"+'PRDC'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "Sin Informacion") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_acued=' + "'"+'Sin Informacion'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 				
				else{
				var filtro = '"cod_barrio=' + valor + '"'; 
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
				}				
		       }
				
			    else if (document.getElementById("manzana").value !== '') { 
				if (datastat === "Uso Coincidente") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_acued=' + "'"+'Igual'+ "'" + '"';
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Comercial-D.Residencial") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_acued=' + "'"+'PCDR'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Residencial-D.Comercial") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_acued=' + "'"+'PRDC'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "Sin Informacion") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_acued=' + "'"+'Sin Informacion'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 				
				else{
				var filtro = '"manzana_co=' + valor + '"'; 
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
				}														
				}				
		       }		     
             }
			
			else if (document.getElementById("Uso_oficial_vs_AAA").value === "Alcantarillado") {
				if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
				if (datastat === "Uso Coincidente") {            
					   var filtro = '"dif_uso_alcant=' + "'"+'Igual'+ "'" + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
				  } 	
				  else if (datastat === "P.Comercial-D.Residencial") {          
					   var filtro = '"dif_uso_alcant=' + "'"+'PCDR'+ "'" + '"';     
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  } 
				  else if (datastat === "P.Residencial-D.Comercial") {          
					   var filtro = '"dif_uso_alcant=' + "'"+'PRDC'+ "'" + '"';     
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "Sin Informacion") {          
					   var filtro = '"dif_uso_alcant=' + "'"+'Sin Informacion'+ "'" + '"';     
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else{
					  var filtro = '"dif_uso_alcant<>' + "'"+'ninguno'+ "'" + '"';  
					  predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
				  }  
			
           } 
           else {
				var valor = "'" + values + "'";
				if (document.getElementById("barrio").value !== '') {
				if (datastat === "Uso Coincidente") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_alcant=' + "'"+'Igual'+ "'" + '"';
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Comercial-D.Residencial") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_alcant=' + "'"+'PCDR'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Residencial-D.Comercial") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_alcant=' + "'"+'PRDC'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "Sin Informacion") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_alcant=' + "'"+'Sin Informacion'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 				
				else{
				var filtro = '"cod_barrio=' + valor + '"'; 
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
				}				
		        }		
			    else if (document.getElementById("manzana").value !== '') { 
				if (datastat === "Uso Coincidente") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_alcant=' + "'"+'Igual'+ "'" + '"';
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Comercial-D.Residencial") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_alcant=' + "'"+'PCDR'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Residencial-D.Comercial") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_alcant=' + "'"+'PRDC'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "Sin Informacion") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_alcant=' + "'"+'Sin Informacion'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 				
				else{
				var filtro = '"manzana_co=' + valor + '"'; 
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
				}														
			    }				
		        } 	 
			   }
			   else if (document.getElementById("Uso_oficial_vs_AAA").value === "Aseo"){
				if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
				if (datastat === "Uso Coincidente") {            
					   var filtro = '"dif_uso_aseo=' + "'"+'Igual'+ "'" + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
				  } 	
				  else if (datastat === "P.Comercial-D.Residencial") {          
					   var filtro = '"dif_uso_aseo=' + "'"+'PCDR'+ "'" + '"';     
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  } 
				  else if (datastat === "P.Residencial-D.Comercial") {          
					   var filtro = '"dif_uso_aseo=' + "'"+'PRDC'+ "'" + '"';     
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "Sin Informacion") {          
					   var filtro = '"dif_uso_aseo=' + "'"+'Sin Informacion'+ "'" + '"';     
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else{
					  var filtro = '"dif_uso_aseo<>' + "'"+'ninguno'+ "'" + '"';  
					  predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
				  }  
			
           } 
           else {
				var valor = "'" + values + "'";
				if (document.getElementById("barrio").value !== '') {
				if (datastat === "Uso Coincidente") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_aseo=' + "'"+'Igual'+ "'" + '"';
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Comercial-D.Residencial") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_aseo=' + "'"+'PCDR'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Residencial-D.Comercial") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_aseo=' + "'"+'PRDC'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "Sin Informacion") { 	
				var filtro = '"cod_barrio=' + valor + ' and ' + 'dif_uso_aseo=' + "'"+'Sin Informacion'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 				
				else{
				var filtro = '"cod_barrio=' + valor + '"'; 
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
				}				
		        }		
			    else if (document.getElementById("manzana").value !== '') { 
				if (datastat === "Uso Coincidente") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_aseo=' + "'"+'Igual'+ "'" + '"';
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Comercial-D.Residencial") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_aseo=' + "'"+'PCDR'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "P.Residencial-D.Comercial") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_aseo=' + "'"+'PRDC'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 
				else if (datastat === "Sin Informacion") { 	
				var filtro = '"manzana_co=' + valor + ' and ' + 'dif_uso_aseo=' + "'"+'Sin Informacion'+ "'" + '"';  
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
				} 				
				else{
				var filtro = '"manzana_co=' + valor + '"'; 
				predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
				}														
			    }				
		        }   		   				   
			   }			
              }
	
	
	       else if (data1 === "valorizacion") {
            if (document.getElementById("valorizacion").value === "franjapredios") {
            if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
                  if (datastat === "FRANJA 1") {
					   var filtro = '"franja=' + 1 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
				  } 	
				  else if (datastat === "FRANJA 2") {          
					    var filtro = '"franja=' + 2 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  } 
				  else if (datastat === "FRANJA 3") {          
					    var filtro = '"franja=' + 3 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  } 
				  else if (datastat === "FRANJA 4") {          
					    var filtro = '"franja=' + 4 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  } 
				  else if (datastat === "FRANJA 5") {          
					    var filtro = '"franja=' + 5 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  } 
				  else if (datastat === "FRANJA 6") {          
					    var filtro = '"franja=' + 6 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "FRANJA 7") {          
					    var filtro = '"franja=' + 7 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "FRANJA 8") {          
					    var filtro = '"franja=' + 8 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "FRANJA 9") {          
					    var filtro = '"franja=' + 9 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "FRANJA 10") {          
					    var filtro = '"franja=' + 10 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "FRANJA 11") {          
					    var filtro = '"franja=' + 11 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "FRANJA 12") {          
					    var filtro = '"franja=' + 12 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "FRANJA 13") {          
					    var filtro = '"franja=' + 13 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "FRANJA 14") {          
					    var filtro = '"franja=' + 14 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else if (datastat === "FRANJA 15") {          
					    var filtro = '"franja=' + 15 + '"';   
					   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
				  }
				  else{
					  var filtro = '"franja<>' + 20 + '"';  
					  predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
				  }       
            } 
           else {   
               var valor = "'" + values + "'";
				if (document.getElementById("barrio").value !== '') {
						if (datastat === "FRANJA 1") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 1 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "FRANJA 2") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 2 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "FRANJA 3") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 3 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 4") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 4 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 5") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 5 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 6") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 6 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 7") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 7 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 8") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 8 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 9") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 9 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 10") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 10 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 11") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 11 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 12") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 11 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 13") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 11 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 14") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 11 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 15") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'franja=' + 11 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else{
							  var filtro = '"cod_barrio=' + valor + '"'; 
							  predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
						  }		
					   }		
			    else if (document.getElementById("manzana").value !== '') { 
				       if (datastat === "FRANJA 1") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 1 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "FRANJA 2") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 2 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "FRANJA 3") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 3 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 4") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 4 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 5") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 5 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 6") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 6 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 7") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 7 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 8") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 8 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 9") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 9 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 10") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 10 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 11") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 11 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 12") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 11 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 13") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 11 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 14") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 11 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "FRANJA 15") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'franja=' + 11 + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else{
							  var filtro = '"manzana_co=' + valor + '"'; 
							  predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
						  }
			
			             }
		   
                        }                  
                        }
                       }
	
			   else if (document.getElementById("Avaluo Catastral").value === "avaluoporrangos") {        
				if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
					if (datastat === "0-20 millones") {            
					      var filtro = '"avaluo between ' + 0 +' and '+ 20000000 + '"';   
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
						} 	
					else if (datastat === "20-50 millones") {          
						  var filtro = '"avaluo between ' + 20000001 +' and '+ 50000000 + '"';   
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)}); 
						  } 
				    else if (datastat === "50-100 millones") {          
						  var filtro = '"avaluo between ' + 50000001 +' and '+ 100000000 + '"';   
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)}); 
						  } 
					else if (datastat === "100-500 millones") {          
						  var filtro = '"avaluo between ' + 100000001 +' and '+ 500000000 + '"';   
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)}); 
						  }
					else if (datastat === "mayor a 500 millones") {          
						  var filtro = '"avaluo between ' + 500000001 +' and '+ 9999999999999 + '"';   
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)}); 
						  }
					else{
						   var filtro = '"avaluo between ' + 0 +' and '+ 9999999999999 + '"';  
						   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
						  }
				   } 
				else {
						var valor = "'" + values + "'";
						if (document.getElementById("barrio").value !== '') {
						if (datastat === "0-20 millones") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'avaluo between ' + 0 +' and '+ 20000000 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "20-50 millones") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'avaluo between ' + 20000001 +' and '+ 50000000 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});			
						} 
						else if (datastat === "50-100 millones") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'avaluo between ' + 50000001 +' and '+ 100000000 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});				
						} 
						else if (datastat === "100-500 millones") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'avaluo between ' + 100000001 +' and '+ 500000000 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "mayor a 500 millones") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'avaluo between ' + 500000001 +' and '+ 9999999999999 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}		
						else{
						var filtro = '"cod_barrio=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}				
						}				
						else if (document.getElementById("manzana").value !== '') { 
						if (datastat === "0-20 millones") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'avaluo between ' + 0 +' and '+ 20000000 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "20-50 millones") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'avaluo between ' + 20000001 +' and '+ 50000000 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});			
						} 
						else if (datastat === "50-100 millones") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'avaluo between ' + 50000001 +' and '+ 100000000 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});				
						} 
						else if (datastat === "100-500 millones") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'avaluo between ' + 100000001 +' and '+ 500000000 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "mayor a 500 millones") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'avaluo between ' + 500000001 +' and '+ 9999999999999 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}		
						else{
						var filtro = '"manzana_co=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}														
						}						
				      }
			         }
	
	
	
				else if (document.getElementById("Avaluo Catastral").value === "crecimientobase") {
					if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
					if (datastat === "VIG2015") {             
						  var filtro = '"vig_incorp=' + "'"+'2015'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
						} 	
					else if (datastat === "VIG2016") {          
						  var filtro = '"vig_incorp=' + "'"+'2016'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						  } 
				    else if (datastat === "VIG2017") {          
						  var filtro = '"vig_incorp=' + "'"+'2017'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						  }
					else if (datastat === "VIG2018") {          
						  var filtro = '"vig_incorp=' + "'"+'2018'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						  }
					else if (datastat === "SIN INFORMACION") {          
						  var filtro = '"vig_incorp=' + "'"+'SIN INFORMACION'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						  }
					else{
						   var filtro = '"vig_incorp<>' + "'"+'ninguno'+ "'" + '"';  
						   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
						  }					
					}
					
				else{
					var valor = "'" + values + "'";
					if (document.getElementById("barrio").value !== '') {
					    if (datastat === "VIG2015") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'vig_incorp=' + "'"+'2015'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "VIG2016") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'vig_incorp=' + "'"+'2016'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "VIG2017") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'vig_incorp=' + "'"+'2017'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "VIG2018") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'vig_incorp=' + "'"+'2018'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "SIN INFORMACION") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'vig_incorp=' + "'"+'SIN INFORMACION'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}	
						else{
						var filtro = '"cod_barrio=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}				
					  }		
					else if (document.getElementById("manzana").value !== '') { 
					    if (datastat === "VIG2015") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'vig_incorp=' + "'"+'2015'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "VIG2016") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'vig_incorp=' + "'"+'2016'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "VIG2017") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'vig_incorp=' + "'"+'2017'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "VIG2018") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'vig_incorp=' + "'"+'2018'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else if (datastat === "SIN INFORMACION") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'vig_incorp=' + "'"+'SIN INFORMACION'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}	
						else{
						var filtro = '"manzana_co=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
					    }														
					   }	
					  }						
				     }
					
					else if (document.getElementById("Avaluo Catastral").value === "pagopredial") { 
					     if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
					     if (datastat === "PAGO PREDIAL A TIEMPO (2017)") {             
						  var filtro = '"pago_2017=' + "'"+'SI'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
						} 	
					     else if (datastat === "NO PAGO A TIEMPO (2017)") {          
						  var filtro = '"pago_2017=' + "'"+'NO'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						  } 	     
					     else{
						   var filtro = '"pago_2017<>' + "'"+'ninguno'+ "'" + '"';  
						   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
						  }					
					    }
											
					else{
						var valor = "'" + values + "'";
					    if (document.getElementById("barrio").value !== '') {
					    if (datastat === "PAGO PREDIAL A TIEMPO (2017)") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'pago_2017=' + "'"+'SI'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "NO PAGO A TIEMPO (2017)") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'pago_2017=' + "'"+'NO'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else{
						var filtro = '"cod_barrio=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}				
					    }		
					    else if (document.getElementById("manzana").value !== '') { 
					    if (datastat === "PAGO PREDIAL A TIEMPO (2017)") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'pago_2017=' + "'"+'SI'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "NO PAGO A TIEMPO (2017)") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'pago_2017=' + "'"+'NO'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else{
						var filtro = '"manzana_co=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}														
					   }	
					  }
					}
	
              else if (document.getElementById("Avaluo Catastral").value === "pagopredial2018") { 
					     if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
					     if (datastat === "REALIZO PAGO PREDIAL (2018)") {             
						  var filtro = '"deuda_2018=' + "'"+'NO'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
						} 	
					     else if (datastat === "NO HA REALIZADO PAGO PREDIAL (2018)") {          
						  var filtro = '"deuda_2018=' + "'"+'SI'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						  } 	     
					     else{
						   var filtro = '"deuda_2018<>' + "'"+'ninguno'+ "'" + '"';  
						   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
						  }					
					    }
											
					else{
						var valor = "'" + values + "'";
					    if (document.getElementById("barrio").value !== '') {
					    if (datastat === "REALIZO PAGO PREDIAL (2018)") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'deuda_2018=' + "'"+'NO'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "NO HA REALIZADO PAGO PREDIAL (2018)") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'deuda_2018=' + "'"+'SI'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else{
						var filtro = '"cod_barrio=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}				
					    }		
					    else if (document.getElementById("manzana").value !== '') { 
					    if (datastat === "REALIZO PAGO PREDIAL (2018)") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'deuda_2018=' + "'"+'NO'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "NO HA REALIZADO PAGO PREDIAL (2018)") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'deuda_2018=' + "'"+'SI'+ "'" + '"';  
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else{
						var filtro = '"manzana_co=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}														
					   }	
					  }
					}	
	
	
	
					else if (document.getElementById("Avaluo Catastral").value === "cambiosavaluo2017") {  
					if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
					     if (datastat === "Decrecimiento") {             
						  var filtro = '"variacion2017 between ' + -100 +' and '+ -1 + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
						} 	
					     else if (datastat === "Crecimiento Atipico") {          
						  var filtro = '"variacion2017 between ' + 1 +' and '+ 1000000 + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
						else if (datastat === "Crecimiento Esperado") {          
						  var filtro = '"variacion2017 between ' + 0 +' and '+ 0 + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
					     else{
						var filtro = '"variacion2017 between ' + -100 +' and '+ 1000000 + '"';  
						   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
						  }					
					    }
					else{
						var valor = "'" + values + "'";
					    if (document.getElementById("barrio").value !== '') {
					    if (datastat === "Decrecimiento") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'variacion2017 between ' + -100 +' and '+ -1 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "Crecimiento Atipico") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'variacion2017 between ' + 1 +' and '+ 1000000 + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "Crecimiento Esperado") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'variacion2017 between ' + 0 +' and '+ 0 + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else{
						var filtro = '"cod_barrio=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}				
					    }		
					    else if (document.getElementById("manzana").value !== '') { 
					    if (datastat === "Decrecimiento") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'variacion2017 between ' + -100 +' and '+ -1 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "Crecimiento Atipico") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'variacion2017 between ' + 1 +' and '+ 1000000 + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "Crecimiento Esperado") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'variacion2017 between ' + 0 +' and '+ 0 + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else{
						var filtro = '"manzana_co=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}														
					   }	 
					}		
			       }
			       else if (document.getElementById("Avaluo Catastral").value === "cambiosavaluo") {     
					if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
						if (datastat === "0-5%") {             
						  var filtro = '"var_predial between ' + 0 +' and '+ 5 + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
						} 	
					     else if (datastat === "5-10%") {          
						  var filtro = '"var_predial between ' + 5 +' and '+ 10 + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
						else if (datastat === ">10%") {          
						  var filtro = '"var_predial between ' + 10 +' and '+ 100 + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
					     else{
						var filtro = '"var_predial between ' + 0 +' and '+ 100 + '"';  
						   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
						  }	
					     }
					else{
						var valor = "'" + values + "'";
					    if (document.getElementById("barrio").value !== '') {
					    if (datastat === "0-5%") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'var_predial between ' + 0 +' and '+ 5 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "5-10%") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'var_predial between ' + 5 +' and '+ 10 + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === ">10%") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'var_predial between ' + 10 +' and '+ 100 + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else{
						var filtro = '"cod_barrio=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}				
					    }		
					    else if (document.getElementById("manzana").value !== '') { 
					    if (datastat === "0-5%") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'var_predial between ' + 0 +' and '+ 5 + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "5-10%") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'var_predial between ' + 5 +' and '+ 10 + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === ">10%") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'var_predial between ' + 10 +' and '+ 100 + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else{
						var filtro = '"manzana_co=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}														
					    }		 
					   }
			    }
			    
			    else if (document.getElementById("Avaluo Catastral").value === "prediosmunicipio") { 
                    if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
                      if (datastat === "Predios Municipio") { 
                          var filtro = '"propietari=' + "'"+'Municipio'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
						} 	
					     else if (datastat === "Otro Propietario") {          
						  var filtro = '"propietari=' + "'"+'Otro'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
						else if (datastat === "Sin Informacion") {          
						  var filtro = '"propietari=' + "'"+'Sin Informacion'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
					     else{
						var filtro = '"propietari<>' + "'"+'Ninguno'+ "'" + '"'; 
						   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
						  }  
                        
                     }
                     else{
                        var valor = "'" + values + "'";
					    if (document.getElementById("barrio").value !== '') {
					    if (datastat === "Predios Municipio") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'propietari=' + "'"+'Municipio'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "Otro Propietario") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'propietari=' + "'"+'Otro'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
                        else if (datastat === "Sin Informacion") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'propietari=' + "'"+'Sin Informacion'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else{
						var filtro = '"cod_barrio=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}				
					    }		
					    else if (document.getElementById("manzana").value !== '') { 
					    if (datastat === "Predios Municipio") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'propietari=' + "'"+'Municipio'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "Otro Propietario") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'propietari=' + "'"+'Otro'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
                        else if (datastat === "Sin Informacion") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'propietari=' + "'"+'Sin Informacion'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else{
						var filtro = '"manzana_co=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}																	
					   }           
                }                        
            }  
            
            if (data1 === "Estratificacion") {	
                 if (document.getElementById("barrio").value === '' && document.getElementById("manzana").value === '') {
                      if (datastat === "Estrato 1") { 
                          var filtro = '"estrato_hacienda=' + "'"+'01'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});  
						} 	
					     else if (datastat === "Estrato 2") {          
						  var filtro = '"estrato_hacienda=' + "'"+'02'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
						else if (datastat === "Estrato 3") {          
						  var filtro = '"estrato_hacienda=' + "'"+'03'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
                         else if (datastat === "Estrato 4") {          
						  var filtro = '"estrato_hacienda=' + "'"+'04'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
                         else if (datastat === "Estrato 5") {          
						  var filtro = '"estrato_hacienda=' + "'"+'05'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
                         else if (datastat === "Estrato 6") {          
						  var filtro = '"estrato_hacienda=' + "'"+'06'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						} 
                         else if (datastat === "PH o Comercial") {          
						  var filtro = '"estrato_hacienda=' + "'"+'99'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						}
                         else if (datastat === "Sin Informacion") {           
						  var filtro = '"estrato_hacienda=' + "'"+'Sin Informacion'+ "'" + '"';
					      predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
						}
					     else{
						var filtro = '"estrato_hacienda<>' + "'"+'Ninguno'+ "'" + '"'; 
						   predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
						  }                 
                     }
                     else{
                        var valor = "'" + values + "'";
					    if (document.getElementById("barrio").value !== '') {
					    if (datastat === "Estrato 1") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'01'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "Estrato 2") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'02'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}  
                        else if (datastat === "Estrato 3") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'03'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
                        else if (datastat === "Estrato 4") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'04'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
                        else if (datastat === "Estrato 5") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'05'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
                        else if (datastat === "Estrato 6") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'06'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
                        else if (datastat === "PH o Comercial") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'99'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
                        else if (datastat === "Sin Informacion") { 	
						var filtro = '"cod_barrio=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'Sin Informacion'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else{
						var filtro = '"cod_barrio=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}				
					    }		
					    else if (document.getElementById("manzana").value !== '') { 
					    if (datastat === "Estrato 1") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'01'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						} 
						else if (datastat === "Estrato 2") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'02'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}  
                        else if (datastat === "Estrato 3") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'03'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
                        else if (datastat === "Estrato 4") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'04'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
                        else if (datastat === "Estrato 5") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'05'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
                        else if (datastat === "Estrato 6") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'06'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
                        else if (datastat === "PH o Comercial") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'99'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
                        else if (datastat === "Sin Informacion") { 	
						var filtro = '"manzana_co=' + valor + ' and ' + 'estrato_hacienda=' + "'"+'Sin Informacion'+ "'" + '"';
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});		
						}
						else{
						var filtro = '"manzana_co=' + valor + '"'; 
						predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});	
						}																	
					  }                       
             }           
       }  
}