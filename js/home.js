/* Home page: section navigation and public user reviews */
Q('[data-sc]').forEach(a=>a.onclick=()=>$(a.dataset.sc).scrollIntoView({behavior:'smooth'}));

let reviewUser=null,reviewProfile=null,ownReview=null;

function renderReviews(items){
 const dateLocale={hr:'hr-HR',en:'en-GB',de:'de-DE'}[appLanguage]||'en-GB';
 $('reviewsList').innerHTML=items.map(doc=>{
  const review=doc.data(),rating=Number(review.rating);
  const stars=Number.isInteger(rating)&&rating>=1&&rating<=5?rating:0;
  const date=review.createdAt&&typeof review.createdAt.toDate==='function'
   ?review.createdAt.toDate().toLocaleDateString(dateLocale,{day:'numeric',month:'short',year:'numeric'})
   :'';
  return `<article class="review-card"><div class="review-top"><b>${esc(review.name||'Secretly user')}</b><span class="review-stars" aria-label="${stars} out of 5 stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</span></div><p>${esc(review.comment||'')}</p>${date?`<time class="mut">${date}</time>`:''}</article>`;
 }).join('');
 $('reviewsStatus').textContent=items.length?'':'No reviews yet. Be the first to share your experience.';
}

function renderReviewForm(){
 const form=$('reviewForm'),guest=$('reviewGuest'),paragraph=guest.querySelector('p');
 if(!reviewUser){
  guest.classList.remove('hide');
  form.classList.add('hide');
  paragraph.textContent='Sign in to leave a review. Your first name and review will be public.';
  guest.querySelectorAll('[data-auth]').forEach(button=>button.classList.remove('hide'));
  return;
 }
 if(!reviewProfile){
  guest.classList.remove('hide');
  form.classList.add('hide');
  paragraph.textContent='Complete your profile before leaving a review.';
  guest.querySelectorAll('[data-auth]').forEach(button=>button.classList.add('hide'));
  return;
 }
 guest.classList.add('hide');
 form.classList.remove('hide');
 $('reviewIdentity').textContent=`Posting as ${reviewProfile.f}. Your first name will be public.`;
 if(ownReview){
  $('reviewComment').value=ownReview.comment||'';
  form.querySelector(`[name="rating"][value="${ownReview.rating}"]`).checked=true;
  $('submitReview').textContent='Update review';
 }else{
  $('reviewComment').value='';
  form.reset();
  $('submitReview').textContent='Post review';
 }
 updateStarHighlight();
}

function updateStarHighlight(){
 const selectedInput=document.querySelector('[name="rating"]:checked');
 const selected=selectedInput?Number(selectedInput.value):0;
 $('starRating').dataset.rating=selected;
 Q('.star-rating label').forEach((label,index)=>label.classList.toggle('selected',index<selected));
}

async function loadReviews(){
 try{
  const reviewsQuery=db.collection('reviews').orderBy('createdAt','desc').limit(30).get();
  const ownQuery=reviewUser?db.doc('reviews/'+reviewUser.uid).get():Promise.resolve(null);
  const [snapshot,ownSnapshot]=await Promise.all([reviewsQuery,ownQuery]);
  ownReview=ownSnapshot&&ownSnapshot.exists?ownSnapshot.data():null;
  renderReviews(snapshot.docs);
  renderReviewForm();
 }catch(error){
  $('reviewsStatus').textContent='Could not load reviews. Please try again later.';
  return fail(error);
 }
}

document.addEventListener('change',event=>{
 if(event.target.matches('[name="rating"]'))updateStarHighlight();
});

$('reviewForm').addEventListener('submit',async event=>{
 event.preventDefault();
 if(!reviewUser||!reviewProfile)return;
 const selectedRating=document.querySelector('[name="rating"]:checked');
 const rating=selectedRating?Number(selectedRating.value):0;
 const comment=$('reviewComment').value.trim();
 if(rating<1||rating>5)return toast('Choose a rating from 1 to 5 stars.');
 if(!comment||comment.length>300)return toast('Write a short comment (up to 300 characters).');
 const button=$('submitReview');
 button.disabled=true;
 try{
  await db.doc('reviews/'+reviewUser.uid).set({
   authorId:reviewUser.uid,
   name:reviewProfile.f.trim(),
   rating,
   comment,
   createdAt:FV.serverTimestamp()
  });
  toast('Your review has been published.');
  await loadReviews();
 }catch(error){fail(error)}
 finally{button.disabled=false}
});

boot((user,profile)=>{
 reviewUser=user;
 reviewProfile=profile;
 loadReviews();
},{public:true});
