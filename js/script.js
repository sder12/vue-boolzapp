
const { createApp } = Vue;
const dt = luxon.DateTime;


createApp({
    data() {
        return {
            activeContact: 0,
            //cancel msg
            activeMsg: null,
            isCanceled: false,
            clickedIconHeader: false,
            //insert new msg
            messageInput: "",
            nowTime: "",
            //search in the list of contacts
            searchTxt: "",
            //the Bot is writing
            botIsWriting: "",
            botIsOnline: "",
            lastAccess: this.generateDateNow(),
            //GIVEN Data            
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            answerBot: [
                "Ciao", "Come stai?", "OK", "Certo", "A domani"
            ]
        }
    },
    methods: {
        changeActive(index) {
            this.isCanceled = false;
            this.activeContact = index
        },
        //create Date Time 
        generateDateNow() {
            return dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
        },


        //Writing a new msg with time and have a 'robot' answer
        addNewMessage() {
            const activeContactBot = this.activeContact;
            //INPUT MSG
            //createObject
            const newMessage = {
                date: this.generateDateNow(),
                message: this.messageInput,
                status: 'sent',
            }
            //select array messages            
            const arrayMessages = this.contacts[this.activeContact].messages;
            const arrayMessagesBot = this.contacts[activeContactBot].messages;
            //push in the array and clean the input
            arrayMessages.push(newMessage);
            this.messageInput = "";

            //OUTPUT-ANSWER
            this.botIsWriting = true;
            //CreateEmptyObj
            const answerMsgEmpty = {
                date: this.generateDateNow(),
                message: this.answerBot[Math.floor(Math.random() * this.answerBot.length)],
                status: 'received',
            };
            //add setTimeOut response           
            setTimeout(() => {
                this.botIsWriting = false;
                this.botIsOnline = true;
                arrayMessagesBot.push(answerMsgEmpty);
            }, 1000);
            //beeing online 
            setTimeout(() => {
                this.botIsOnline = false;
                this.lastAccess = this.generateDateNow();
            }, 3000)
        },

        //Search-filter in the contact
        filterSearch() {
            this.contacts.forEach(element => {
                const nameContact = element.name;
                if (nameContact.toLowerCase().includes(this.searchTxt)) {
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            });
        },

        //Click on a msg --> Pop up Info/Cancel Msg
        visualizeCancel(i) {
            if (this.activeMsg === null) {
                this.activeMsg = parseInt(i);
            } else {
                this.activeMsg = null;
            }
        },

        //Click on the Pop up --> elimination of the msg 
        deleteMsg(index) {
            const arrayMessages = this.contacts[this.activeContact].messages;
            if (!!arrayMessages.length && index !== 0) {
                arrayMessages.splice(index, 1);
            } else {
                this.isCanceled = true;
            }
        },

        visualizeCancelDiv() {            
                this.clickedIconHeader = !this.clickedIconHeader
        }
    },

}).mount("#app")


//PSEUDOCODICE
//cliccando in alto a destra si apre una tendina dove posso eliminare
//sia chat intera (this.isCanceled) sia contatto dall'array-obj

//creo div fantasma
//lo rendo visibile al click dell'icona
//possibilità di cliccare 1 o l'altro div interni
//     1. "Elimina tutti i messaggi"
//     2. "Elimina chat"
// 1. setto il this.Canceled = true
//2. cancello l'obj nell'array dei contatti