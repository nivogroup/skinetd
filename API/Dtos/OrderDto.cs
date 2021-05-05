﻿using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class OrderDto
    {
        public string BasketId { get; set; }
        [Required]
        public int DeliveryMethodId { get; set; }
        public AddressDto ShipToAddress { get; set; }
    }
}
