<script>

export default {
    data() {
        return {
            isTelegramClient: false,
            minTelegramVersionAchieved: false,
            test: "test"
        }
    },

    methods: {
        showQrPopup() {
            Telegram.WebApp.showScanQrPopup('Scan QR Code', (data) => {
                // this.test = data
                // this.hapticFeedback()
                // Telegram.WebApp.sendData(data)
                // Telegram.WebApp.closeScanQrPopup()
                // Telegram.WebApp.close()
            })
        },

        hapticFeedback() {
            Telegram.WebApp.HapticFeedback.notificationOccurred('success')
        }
    },

    created() {
        Telegram.WebApp.onEvent('qrTextReceived', (data) => this.test = data )
        
        if (Telegram.WebApp.platform != 'unknown') {
            this.isTelegramClient = true
        }

        this.minTelegramVersionAchieved = Telegram.WebApp.isVersionAtLeast('6.4')

        Telegram.WebApp.MainButton.setText("Scan QR code")
        Telegram.WebApp.onEvent('mainButtonClicked', this.showQrPopup)

        if (this.isTelegramClient && this.minTelegramVersionAchieved) {
            Telegram.WebApp.MainButton.show()
            this.showQrPopup()
        }
    }

}
</script>

<template>
    <div v-if="!isTelegramClient">
        <h3>Please open the app from a Telegram client!</h3>
    </div>
    <div v-else-if="!isTelegramClient && !minTelegramVersionAchieved">
        <h3>
            Please update Telegram to Use the app!<br>
            Telegram API version needed 6.4 or greater.<br>
        </h3>
    </div>
    <div v-else>
        <h3>
            {{ test }}
            Press the button below to open the QR scanner<br>
        </h3>

    </div>
</template>

<style scoped>
h3 {
    margin: 0;
    padding-top: 2%;
    text-align: center;
}
</style>