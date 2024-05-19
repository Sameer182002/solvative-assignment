'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/ button/button";
import ReviewTable from "@/components/molecules/reviewTable/reviewTable";
import getAllReviews from "@/apis/review/getAllReview";

export default function HomePage() {
  const [reviewData, setReviewData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000'); // Ensure this URL is correct
    
    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (['ADD', 'UPDATE', 'DELETE'].includes(message.type)) {
        getReviews();
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    getReviews();

    return () => {
      ws.close();
    };
  }, []);

  async function getReviews() {
    try {
      console.log("call")
      const response = await getAllReviews();
      const { data: { data = [] } = {} } = response;
      setReviewData(data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  function handleClick() {
    router.push('/new');
  }

  return (
    <div className="mainWrapper">
      <h1>Live Reviews</h1>
      <Button text="Add Review" handleClick={handleClick} />
      <ReviewTable data={reviewData} />
    </div>
  );
}
