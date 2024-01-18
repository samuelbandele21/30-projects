const upLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowLetters = "abcdefghijklmnopqrstuvwxyz"
const nums = "0123456789"
const spLetters = "!@#$%^&*()_=[]{}?><"
const passLength = 14

const allPass = upLetters + lowLetters + nums + spLetters

const passText = document.getElementById("password")

function passGen() {
    let password = ""
    password += upLetters[Math.floor(Math.random() * upLetters.length)]
    password += lowLetters[Math.floor(Math.random() * lowLetters.length)]
    password += nums[Math.floor(Math.random() * nums.length)]
    password += spLetters[Math.floor(Math.random() * spLetters.length)]

    while (password.length < passLength) {
        password += allPass[Math.floor(Math.random() * allPass.length)]
    }

    passText.value = password
}

function toCopy() {
    passText.select()
    document.execCommand("copy")
}