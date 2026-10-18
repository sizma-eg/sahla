import{initializeApp}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import{getAuth,signInWithEmailAndPassword,signOut,onAuthStateChanged,createUserWithEmailAndPassword}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import{getFirestore,collection,doc,getDoc,setDoc,addDoc,updateDoc,deleteDoc,onSnapshot,query,orderBy}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

export{initializeApp,getAuth,signInWithEmailAndPassword,signOut,onAuthStateChanged,createUserWithEmailAndPassword,collection,doc,getDoc,setDoc,addDoc,updateDoc,deleteDoc,onSnapshot,query,orderBy};

export const cfg={apiKey:"AIzaSyDZ6B12V9UMqxvgDw4wLk92hL2e7GzX-sU",authDomain:"sahla-2008.firebaseapp.com",projectId:"sahla-2008",storageBucket:"sahla-2008.firebasestorage.app",messagingSenderId:"316632600697",appId:"1:316632600697:web:6ae2fb3f7e93e7d84204a8"};
export const app=initializeApp(cfg),auth=getAuth(app),db=getFirestore(app);

export const $=s=>document.querySelector(s);
export const $$=s=>[...document.querySelectorAll(s)];
export const E=u=>u.trim().toLowerCase()+"@sahla.app";
export const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
export const LOGO=`<svg width="34" height="34" viewBox="0 0 48 48" aria-label="سهلة"><rect width="48" height="48" rx="12" fill="#2fd0a0"/><path d="M13 25l8 8 14-17" fill="none" stroke="#032016" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export function guard(page,cb,ownerOnly){
 onAuthStateChanged(auth,async u=>{
  if(!u){location.replace("login.html");return}
  const s=await getDoc(doc(db,"users",u.uid));
  if(!s.exists()||!s.data().active){await signOut(auth);location.replace("login.html?x=1");return}
  const me={uid:u.uid,...s.data()},own=me.role==="owner";
  if(ownerOnly&&!own){location.replace("index.html");return}
  const L=[["index.html","الإعلانات"],["instructions.html","التعليمات"]];
  if(own)L.push(["employees.html","الموظفين"]);
  $("#hdr").innerHTML=`<header>${LOGO}<nav>${L.map(([h,n])=>`<a href="${h}" class="${h===page?"on":""}">${n}</a>`).join("")}</nav><button id="out">خروج</button></header>`;
  $("#out").onclick=()=>signOut(auth);
  document.body.classList.remove("hide");
  cb(me,own);
 });
}
