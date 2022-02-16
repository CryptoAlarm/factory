import Storage from "node-storage-object"

interface user {
  id: string 
  name: string 
}


const storage = Storage({ filename: "" })