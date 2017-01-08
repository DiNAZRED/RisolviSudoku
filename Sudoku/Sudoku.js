var RIPETIZIONE;
var CONTEGGIO = 0;
var CONS = 9;
var Caselle = new Array( CONS );
var CaselleRiga = new Array( CONS );
var CaselleColonna = new Array( CONS );

var nomeCaselle = "ABCDEFGHI";
var nomeCaselleRiga = "abcdefghi";
var nomeCaselleColonna = "JKLMNOPQR";

function Inizio()
{
	InizializzazioneArray( Caselle, nomeCaselle );
	InizializzazioneArray( CaselleRiga, nomeCaselleRiga );
	InizializzazioneArray( CaselleColonna, nomeCaselleColonna );
	var rosso = Colore();
	var verde = Colore();
	var blu = Colore();
	titolo.style.color = "rgb("+ rosso +","+ verde +","+ blu +")";
	titolo.style.backgroundColor = "rgb("+ ( 255 - rosso ) +","+ ( 255 - verde ) +","+ ( 255 - blu ) +")";
	titolo.style.borderColor = "rgb("+ rosso +","+ verde +","+ blu +")";
}

function Colore()
{
	var numeroCasuale = ( Math.floor( Math.random() * 15 ) + 1 );
	
	return ( numeroCasuale * 15 );
}

function Risolvi()
{
	var FERMA = 0;
	var CaselleInserite = [ [ "", "", "", "", "", "", "", "", "" ], [ "", "", "", "", "", "", "", "", "" ], [ "", "", "", "", "", "", "", "", "" ], [ "", "", "", "", "", "", "", "", "" ], [ "", "", "", "", "", "", "", "", "" ], [ "", "", "", "", "", "", "", "", "" ], [ "", "", "", "", "", "", "", "", "" ], [ "", "", "", "", "", "", "", "", "" ], [ "", "", "", "", "", "", "", "", "" ] ];
	
	for( var CONT = 0; CONT < CONS; CONT++ )
	{
		for( var CONT_1 = 0; CONT_1 < CONS; CONT_1++ )
		{
			if( CaselleRiga[ CONT ][ CONT_1 ].value != "" )
				CaselleInserite[ CONT ][ CONT_1 ] = CaselleRiga[ CONT ][ CONT_1 ].value;
		}
	}
	
	for( var CONT = 0; CONT < CONS; CONT++ )
	{
		RIPETIZIONE = CONT;
		for( var CONT_1 = 0; CONT_1 < CONS; CONT_1++ )
		{
			if( ( CaselleRiga[ CONT ][ CONT_1 ].value ) == "" )
			{
				var numeroInserito = NumeroCasuale( Caselle[ IndiceQuadrato( CONT, CONT_1 ) ], CaselleRiga, CaselleColonna[ CONT_1 ], CaselleInserite, CONT );
				if( numeroInserito == -1 )
					CONT_1 = -1;
				else if( !( numeroInserito ) )
				{
					CONT = -1;
					CONT_1 = 0;
					break;
				}
				else
				{
					CaselleRiga[ CONT ][ CONT_1 ].value = numeroInserito;
					CaselleRiga[ CONT ][ CONT_1 ].style.backgroundColor = "#55FF55";
					CaselleRiga[ CONT ][ CONT_1 ].disabled = "disabled";
				}
			}
		}
	}
	
	controlloMouse.disabled = "disabled";
}

function Prova( ArrayDaVerificare )
{
	var FERMA1 = 2;
	
	for( var CONT = 0; ( CONT < 9 ) && ( FERMA1 ); CONT++ )
	{
		for( var CONT_1 = 0; ( CONT_1 < 9 ) && ( FERMA1 ); CONT_1++ )
		{
			if( ( ArrayDaVerificare[ CONT ][ CONT_1 ].value ) == "" )
				FERMA1--;
		}
		if( FERMA1 == 1 )
		{
			InserisciNumero( ArrayDaVerificare[ CONT ] );
			FERMA1++;
		}
	}
	
	return FERMA1;
}

function InserisciNumero( ArraySenzaNumero )
{
	var FERMA = 1;
	
	for( var CONT = 0; ( CONT < 9 ) && ( FERMA ); CONT++ )
	{
		for( var CONT_1 = 0; ( CONT_1 < 9 ) && ( FERMA ); CONT_1++ )
		{
			if( parseInt( ArraySenzaNumero[ CONT ].value ) != ( CONT_1 + 1 ) )
			{
				ArraySenzaNumero[ CONT ].value = ( CONT_1 + 1 );
				FERMA--;
			}
		}
	}
}

function Controllo( ArrayDaControllare, numero )
{
	var CONFERMA = 1;
	
	for( var CONT = 0; ( CONT < 9 ) && ( CONFERMA ); CONT++ )
	{
		if( parseInt( ArrayDaControllare[ CONT ].value ) == numero )
			CONFERMA = 0;
	}
	return CONFERMA;
}

function NumeroCasuale( Quadrato, Riga, Colonna, CaselleIniziali, indice )
{
	var FERMA = 0;
	var CONT = 0;
	var numeroCasuale;
	do{
		numeroCasuale = ( Math.floor( Math.random() * 9 ) + 1 );
		if( ( Controllo( Quadrato, numeroCasuale ) ) && ( Controllo( Riga[ indice ], numeroCasuale ) ) && ( Controllo( Colonna, numeroCasuale ) ) )
			FERMA = 1;
		CONT++;
	}while( !( FERMA ) && ( CONT < 100 ) );
	
	if( CONT == 100 )
	{
		numeroCasuale = Rifai( Riga[ indice ], CaselleIniziali[ indice ] );
		if( RIPETIZIONE == indice )
			CONTEGGIO++;
		
		if( CONTEGGIO == 50 )
		{
			if( indice > 6 )
				indice = 2;
			else
				indice = 0;
			for( var CONT = indice; CONT < 9; CONT++ )
				numeroCasuale = Rifai( Riga[ CONT ], CaselleIniziali[ CONT ] )
			
			numeroCasuale = 0;
			CONTEGGIO = 0;
		}
	}
	
	return numeroCasuale;
}

function InizializzazioneArray( ArrayDaInizializzare, nomeClasse )
{
	for( var CONT = 0; CONT < 9; CONT++ )
		ArrayDaInizializzare[ CONT ] = document.getElementsByClassName( nomeClasse[ CONT ] );
}

function IndiceQuadrato( riga, colonna )
{
	var indiceriga = 0;
	var indicecolonna = 0;

	for( var CONT = riga; CONT > 2; CONT -= 3 )
		indiceriga++;
	
	for( var CONT = colonna; CONT > 2; CONT -= 3 )
		indicecolonna++;
	
	return ( ( indiceriga * 3 ) + indicecolonna );
}

function Rifai( Linea, Stampa )
{
	for( var CONT = 0; CONT < 9; CONT++ )
		Linea[ CONT ].value = Stampa[ CONT ];
	
	return -1;
}

function InserimentoNumero( nomeCasella, riga, colonna )
{
	if( ( nomeCasella.value < "1" ) || ( nomeCasella.value > "9" ) )
	{
		if( nomeCasella.value != "" )
		{
			alert( "IL CARATTERE "+ nomeCasella.value.toUpperCase() +" NON E' ACCETTATO!\nINSERIRE UN NUMERO COMPRESO TRA 1 E 9" );
			nomeCasella.value = "";
			nomeCasella.style.borderStyle = "";
		}
	}
	else if( ( parseInt( nomeCasella.value ) >= 1 ) && ( parseInt( nomeCasella.value ) <= 9 ) )
	{
		var temporanea = parseInt( nomeCasella.value );
		nomeCasella.value = "";
			
		if( ( Controllo( Caselle[ IndiceQuadrato( riga, colonna ) ], temporanea ) ) && ( Controllo( CaselleRiga[ riga ], temporanea ) ) && ( Controllo( CaselleColonna[ colonna ], temporanea ) ) )
		{
			nomeCasella.style.borderStyle = "solid";
			nomeCasella.style.borderColor = "black";
			nomeCasella.value = temporanea;
			nomeCasella.style.background = "#AAAAAA";
			nomeCasella.disabled = "disabled";
		}
		else
		{
			alert( "IL NUMERO "+ temporanea +" NON PUO' ESSERE INSERITO IN QUESTA POSIZIONE.\nINSERIRE UN ALTRO NUMERO COMPRESO TRA 1 E 9" );
			nomeCasella.value = "";
			nomeCasella.style.borderStyle = "";
		}
	}
	else
	{
		alert( "IL NUMERO "+ nomeCasella.value +" NON E' ACCETTATO!\nINSERIRE UN NUMERO COMPRESO TRA 1 E 9" );
		nomeCasella.value = "";
		nomeCasella.style.borderStyle = "";
	}
}

function PulisciTutto()
{
	for( var CONT = 0; CONT < CONS; CONT++ )
	{
		for( var CONT_1 = 0; CONT_1 < CONS; CONT_1++ )
		{
			Caselle[ CONT ][ CONT_1 ].value = "";
			Caselle[ CONT ][ CONT_1 ].style.backgroundColor = "";
			Caselle[ CONT ][ CONT_1 ].style.borderStyle = "";
			Caselle[ CONT ][ CONT_1 ].disabled = "";
		}
	}
	
	controlloMouse.disabled = "";
}

function CambiaMouse( tipo )
{	
	for( var CONT = 0; CONT < CONS; CONT++ )
	{
		for( var CONT_1 = 0; CONT_1 < CONS; CONT_1++ )
			Caselle[ CONT ][ CONT_1 ].style.cursor = tipo;
	}
}

function CambiaNumero( nomeCasella )
{
	if( ( nomeCasella.style.cursor == 'pointer' ) && ( nomeCasella.style.borderColor == "black" ) )
	{
		nomeCasella.disabled = "";
		nomeCasella.select();
		nomeCasella.style.background = "";
		nomeCasella.value = "";
		nomeCasella.style.borderStyle = "";
	}
	CambiaMouse( "" );
}

