

export class rtcConfig {
    private static instance: rtcConfig;
    rtcConnection: RTCPeerConnection | null = null;
    private offer: RTCSessionDescriptionInit | null = null;
    private answer: RTCSessionDescriptionInit | null = null;
    private constructor() {

    }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new rtcConfig();
            console.log("New instance initialized") 
        }
        else console.log("Instance already there !")
        return this.instance;
    }

    isConnectionEstb() {
        if (this.rtcConnection){
            console.log("signaling state : ",this.rtcConnection.signalingState)
            if(this.rtcConnection.signalingState === "stable") return true;
        }
        return false;
    }

    newConnection() {
        console.log("Creating new connection ... ")
        this.rtcConnection = new RTCPeerConnection();
        return this.rtcConnection;
    }
    giveRTC(){
        return this.rtcConnection
    }
    async createOffer() {
        console.log("Creating Offer ... ")
        if (this.rtcConnection) {
            this.offer = await this.rtcConnection.createOffer();
        }
        return this.offer;
    }
    async createAnswer() {
        console.log("Creating Answer ... ")
        if (this.rtcConnection) {
            this.answer = await this.rtcConnection.createAnswer();
        }
        return this.answer;
    }
    async setLocalDescription(temp: RTCSessionDescriptionInit) {
        console.log("Setting Local Desc ... ")
        if (this.rtcConnection) {
            await this.rtcConnection.setLocalDescription(temp);
        }
    }
    async setRemoteDescription(temp: RTCSessionDescriptionInit) {
        console.log("Setting Remote Desc ... ")
        if (this.rtcConnection) {
            await this.rtcConnection.setRemoteDescription(temp);
        }
    }
}